import pandas as pd
import numpy as np
import os.path
import json
from sklearn.decomposition import TruncatedSVD
import re
import psycopg2 as pg

class SkillDatabase:
    CONNECTION_URL = pg.connect("dbname='vacancies' user='postgres' host='127.0.0.1' port='5432' password='localdbpass'")
    PATH_TO_SKILLS = os.path.dirname(os.path.abspath(__file__)) + '/cache/skills.json'
    PATH_TO_CATEGORIES = os.path.dirname(os.path.abspath(__file__)) + '/examples/categories.json'
    PATH_TO_TECHNOLOGIES = os.path.dirname(os.path.abspath(__file__)) + '/examples/technologies.json'

    def __init__(self):
        self.all_skills = pd.read_sql(f'''
            SELECT KeySkill.name, KeySkillTranslation.translation, count(*), KeySkillImage.image FROM KeySkill
                LEFT JOIN KeySkillTranslation ON KeySkillTranslation.name = KeySkill.name
                LEFT JOIN KeySkillImage ON KeySkillImage.name = KeySkill.name
                GROUP BY KeySkill.name, KeySkillTranslation.name, KeySkillImage.image
                ORDER BY count DESC
            ''', con=self.CONNECTION_URL).to_dict('records')

        self.skills_cache = {}
        if os.path.isfile(self.PATH_TO_SKILLS):
            with open(self.PATH_TO_SKILLS, encoding='utf-8') as f:
                self.skills_cache = json.load(f)

    def update_skills_cache(self):
        self.update_skills()
        self.update_cooccurrences()
        self.update_embeddings()
        self.update_category_similarities()
        self.update_technology_similarities()

    def update_skills(self):
        for index, skill in enumerate(self.all_skills):
            self.skills_cache[skill['name']] = {
                'name': skill['name'],
                'translation': skill['translation'],
                'count': skill['count']
            }
        with open(self.PATH_TO_SKILLS, 'w', encoding='utf-8') as f:
            f.write(json.dumps(self.skills_cache))

    def get_skill_contexts_list(self):
        return [
            "{}",
            "Experience in working with {}",
            "Practical knowledge of {}",
            "Strong background in {}",
            "Deep understanding of {}",
        ]



    def get_skill_in_different_contexts(self, skill_name):
        return map(lambda x: x.format(skill_name), self.get_skill_contexts_list())


    def update_embeddings(self):
        skill_names = []
        for skill in self.all_skills:
            name = skill['translation'] if skill['translation'] is not None else skill['name']
            skill_contexts = self.get_skill_in_different_contexts(name)
            skill_names += skill_contexts

        from sentence_transformers import SentenceTransformer
        model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")
        all_embeddings = model.encode(skill_names, show_progress_bar=True, batch_size=8, device='cuda:0')

        BATCH_SIZE = len(self.get_skill_contexts_list())
        embeddings_batches = np.split(all_embeddings, np.arange(BATCH_SIZE, len(all_embeddings), BATCH_SIZE))
        embeddings = [np.mean(batch, axis=0) for batch in embeddings_batches]

        for i, s in enumerate(self.all_skills):
            self.skills_cache[s['name']]['embedding'] = embeddings[i].tolist()

        with open(self.PATH_TO_SKILLS, 'w', encoding='utf-8') as f:
            f.write(json.dumps(self.skills_cache))



    def get_skill_cooc(self, skill_name):
        return pd.read_sql(f'''
            SELECT KeySkill.name, count(*) FROM KeySkill
                WHERE KeySkill.vacancy_id IN (
                    SELECT id FROM Vacancy
                        INNER JOIN KeySkill ON Vacancy.id = KeySkill.vacancy_id
                        WHERE KeySkill.name = $${skill_name}$$
                ) 
                GROUP BY KeySkill.name
                ORDER BY count DESC
            ''', con=self.CONNECTION_URL)

    def update_cooccurrences(self, VECTOR_SIZE = 1000):
        skill_names = {skill['name']: i for i, skill in enumerate(self.all_skills)}
        SKILLS_LEN = len(skill_names)
        cooccurrences = []
        for i, target_skill in enumerate(list(skill_names.keys())):
            print(f'{i}/{SKILLS_LEN} -- {target_skill}')
            cooc_vector = np.zeros(SKILLS_LEN)
            cooc_skills = self.get_skill_cooc(target_skill)
            indices = cooc_skills['name'].map(skill_names)
            cooc_vector[indices] = cooc_skills['count'].values
            cooccurrences.append(cooc_vector/np.linalg.norm(cooc_vector))
        
        cooccurrences = TruncatedSVD(n_components=VECTOR_SIZE).fit_transform(np.array(cooccurrences))

        for i, s in enumerate(self.all_skills):
            self.skills_cache[s['name']]['cooc'] = cooccurrences[i].tolist()

        with open(self.PATH_TO_SKILLS, 'w', encoding='utf-8') as f:
            f.write(json.dumps(self.skills_cache))
        

    def update_category_similarities(self):
        self.update_similarities(self.PATH_TO_CATEGORIES, 'category_similarities')
        return self

    def update_technology_similarities(self):
        self.update_similarities(self.PATH_TO_TECHNOLOGIES, 'technology_similarities')
        return self

    def update_similarities(self, path_to_file, key):
        with open(path_to_file, encoding='utf-8') as f:
            categories = json.load(f)

        category_hints = {}

        for c in categories.keys():
            print(c)
            title = categories[c]['hint']
            category_similar_skills = []
            for skill in categories[c]['examples']:
                similar_skills = filter(lambda x: re.search(skill, x['name']), self.all_skills)
                category_similar_skills += similar_skills

            category_hints[c] = {
                'title': title,
                'similar_skills': category_similar_skills
            }

        category_names = []

        BATCH_SIZE = 100
        for category in category_hints:
            print(category)
            title = category_hints[category]['title']
            similar_skills = [x['translation'] if x['translation'] is not None else x['name'] for x in category_hints[category]['similar_skills']]
            for _ in range(BATCH_SIZE):
                np.random.shuffle(similar_skills)
                name = f'{title}. Required Skills: {", ".join(similar_skills[0:5])}.'
                category_names.append(name)
        
        from sentence_transformers import SentenceTransformer
        model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")
        all_embeddings = model.encode(category_names, show_progress_bar=True, batch_size=8, device='cuda:0')

        embeddings_batches = np.split(all_embeddings, np.arange(BATCH_SIZE, len(all_embeddings), BATCH_SIZE))
        category_embeddings = [np.mean(batch, axis=0) for batch in embeddings_batches]

        for i, s in enumerate(self.skills_cache.keys()):
            print(f'{i}/{len(self.skills_cache.keys())}')
            target_embedding = self.skills_cache[s]['embedding']
            dots = []
            for embedding in category_embeddings:
                category_embedding = embedding.tolist()
                dots.append(np.dot(target_embedding/np.linalg.norm(target_embedding), category_embedding/np.linalg.norm(category_embedding)))
            self.skills_cache[s][key] = dots

        with open(self.PATH_TO_SKILLS, 'w', encoding='utf-8') as f:
            f.write(json.dumps(self.skills_cache))
    

    def get_vector(self, skill_name, weights):
        weights = np.array(weights)
        weights = weights/np.sum(weights)

        skill = self.skills_cache[skill_name]
        vector = np.concatenate([
            np.array(skill['cooc']) * weights[0],
            np.array(skill['embedding']) * weights[1],
            np.array(skill['category_similarities']) * weights[2],
            np.array(skill['technology_similarities']) * weights[3]
        ])
        return vector/np.linalg.norm(vector)
    
        
    def get_similar_skills(self, skill_name):
        similar_skills = pd.read_sql(f'''
            SELECT KeySkill.name, count(*) FROM KeySkill
                LEFT JOIN KeySkillTranslation ON KeySkillTranslation.name = KeySkill.name
                WHERE KeySkill.name ~* $${skill_name}$$
                GROUP BY KeySkill.name, KeySkillTranslation.name
                ORDER BY count DESC
            ''', con=self.CONNECTION_URL).to_dict('records')
        return list(map(lambda x: x['name'], similar_skills))


    def get_skill_probability_estimation(self, skill_name, category_skills):
        estimation = []

        for category in category_skills.keys():
            estimation.append(category_skills[category][skill_name] if skill_name in category_skills[category] else 0)
        estimation = np.array(estimation)
        return estimation/np.sum(estimation)
    
    def get_cluster_skills(self, skills_list):
        skills_query = list(map(lambda x: f"KeySkill.name ~* $${x}$$", skills_list))
        similar_skills = pd.read_sql(f'''
            SELECT KeySkill.name, count(*) FROM KeySkill
                WHERE KeySkill.vacancy_id IN (
                    SELECT KeySkill.vacancy_id FROM KeySkill    
                        INNER JOIN Vacancy ON Vacancy.id = KeySkill.vacancy_id
                        WHERE ({f' OR '.join(skills_query)})
                )
                GROUP BY KeySkill.name
                ORDER BY count DESC
            ''', con=self.CONNECTION_URL).to_dict('records')
        return dict(map(lambda x: (x['name'], x['count']), similar_skills))