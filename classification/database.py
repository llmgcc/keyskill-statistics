import pandas as pd
import numpy as np
import os.path
import json
from sklearn.decomposition import TruncatedSVD
import re
import psycopg2 as pg
import os
from dotenv import load_dotenv


load_dotenv(
    os.path.dirname(os.path.abspath(__file__ + "/../")) + "/backend/.env.example"
)


class SkillDatabase:
    CONNECTION_URL = pg.connect(
        f"dbname='{os.getenv('DATABASE')}' "
        f"user='{os.getenv('USER')}' "
        f"host='{os.getenv('HOST')}' "
        f"port='{5432}' "
        f"password='{os.getenv('PASSWORD')}'"
    )
    PATH_TO_SKILLS = os.path.dirname(os.path.abspath(__file__)) + "/cache/skills.json"
    PATH_TO_CATEGORIES = (
        os.path.dirname(os.path.abspath(__file__)) + "/examples/domains.json"
    )
    PATH_TO_TECHNOLOGIES = (
        os.path.dirname(os.path.abspath(__file__)) + "/examples/categories.json"
    )

    def __init__(self):
        self.all_skills = pd.read_sql(
            """
            SELECT KeySkill.name, KeySkillTranslation.translation, count(*), KeySkillImage.image FROM KeySkill
                LEFT JOIN KeySkillTranslation ON KeySkillTranslation.name = KeySkill.name
                LEFT JOIN KeySkillImage ON KeySkillImage.name = KeySkill.name
                GROUP BY KeySkill.name, KeySkillTranslation.name, KeySkillImage.image
                ORDER BY count DESC
            """,
            con=self.CONNECTION_URL,
        ).to_dict("records")

        self.skills_cache = {}
        if os.path.isfile(self.PATH_TO_SKILLS):
            with open(self.PATH_TO_SKILLS, encoding="utf-8") as f:
                self.skills_cache = json.load(f)

    def get_all_skills(self):
        return list(self.skills_cache.keys())

    def update_skills_cache(self):
        self.update_translations()
        self.update_skills()
        self.update_cooccurrences()
        self.update_embeddings()
        self.update_category_similarities()
        self.update_technology_similarities()

    def translate_skills(self, skills):
        from transformers import pipeline

        translator = pipeline("translation", model="Helsinki-NLP/opus-mt-ru-en")

        BATCH_SIZE = 100
        cyrillic_skills_batches = np.array_split(
            skills, np.arange(BATCH_SIZE, len(skills), BATCH_SIZE)
        )
        translations_dict = {}

        for i, batch in enumerate(cyrillic_skills_batches):
            print(f"Batch {i}/{len(cyrillic_skills_batches)}")
            texts = [
                f"Ключевые навыки на IT вакансию: JavaScript, Python and {skill}"
                for skill in batch
            ]

            eng_translations = list(
                map(
                    lambda x: x["translation_text"],
                    translator(texts + [skill for skill in batch], batch_size=4),
                )
            )
            simple_translations = eng_translations[BATCH_SIZE:]
            eng_translations = eng_translations[0:BATCH_SIZE]

            for i, skill in enumerate(batch):
                translation = re.search("and (.*)$", eng_translations[i])
                if translation is not None:
                    translation = translation.group(1).strip()
                else:
                    translation = simple_translations[i]
                    print(
                        f'\t undefined translation "{eng_translations[i]}" -- set "{simple_translations[i]}" -- {batch[i]}'
                    )
                print(f"{i + 1} {batch[i]} | {translation}")
                translations_dict[skill] = translation
        return translations_dict

    def update_translations(self):
        def has_cyrillic(text):
            return bool(re.search("[а-яА-Я]", text))

        skills = list(
            map(
                lambda x: x["name"]
                if has_cyrillic(x["name"]) and x["translation"] is None
                else None,
                self.all_skills,
            )
        )
        cyrillic_skills = list(filter(lambda x: x is not None, skills))
        translations = self.translate_skills(cyrillic_skills)

        db_connection = self.CONNECTION_URL
        for k in translations:
            db_connection.cursor().execute(
                "INSERT INTO KeySkillTranslation (name, translation) VALUES(%s, %s) ON CONFLICT (name) DO UPDATE SET translation = %s",
                (k, translations[k], translations[k]),
            )
        db_connection.commit()

    def update_skills(self):
        for skill in self.all_skills:
            self.skills_cache[skill["name"]] = {
                "name": skill["name"],
                "translation": skill["translation"],
                "count": skill["count"],
            }
        with open(self.PATH_TO_SKILLS, "w", encoding="utf-8") as f:
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
            name = (
                skill["translation"]
                if skill["translation"] is not None
                else skill["name"]
            )
            skill_contexts = self.get_skill_in_different_contexts(name)
            skill_names += skill_contexts

        from sentence_transformers import SentenceTransformer

        model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")
        all_embeddings = model.encode(
            skill_names, show_progress_bar=True, batch_size=8, device="cuda:0"
        )

        BATCH_SIZE = len(self.get_skill_contexts_list())
        embeddings_batches = np.split(
            all_embeddings, np.arange(BATCH_SIZE, len(all_embeddings), BATCH_SIZE)
        )
        embeddings = [np.mean(batch, axis=0) for batch in embeddings_batches]

        for i, s in enumerate(self.all_skills):
            self.skills_cache[s["name"]]["embedding"] = embeddings[i].tolist()

        with open(self.PATH_TO_SKILLS, "w", encoding="utf-8") as f:
            f.write(json.dumps(self.skills_cache))

    def get_skill_cooc(self, skill_name):
        return pd.read_sql(
            f"""
            SELECT KeySkill.name, count(*) FROM KeySkill
                WHERE KeySkill.vacancy_id IN (
                    SELECT id FROM Vacancy
                        INNER JOIN KeySkill ON Vacancy.id = KeySkill.vacancy_id
                        WHERE KeySkill.name = $${skill_name}$$
                ) 
                GROUP BY KeySkill.name
                ORDER BY count DESC
            """,
            con=self.CONNECTION_URL,
        )

    def update_cooccurrences(self, VECTOR_SIZE=1000):
        skill_names = {skill["name"]: i for i, skill in enumerate(self.all_skills)}
        SKILLS_LEN = len(skill_names)
        cooccurrences = []
        for i, target_skill in enumerate(list(skill_names.keys())):
            print(f"{i}/{SKILLS_LEN} -- {target_skill}")
            cooc_vector = np.zeros(SKILLS_LEN)
            cooc_skills = self.get_skill_cooc(target_skill)
            indices = cooc_skills["name"].map(skill_names)
            cooc_vector[indices] = cooc_skills["count"].values
            cooccurrences.append(cooc_vector / np.linalg.norm(cooc_vector))

        svd = TruncatedSVD(n_components=VECTOR_SIZE)
        cooccurrences = svd.fit_transform(np.array(cooccurrences))

        for i, s in enumerate(self.all_skills):
            self.skills_cache[s["name"]]["cooc"] = cooccurrences[i].tolist()

        with open(self.PATH_TO_SKILLS, "w", encoding="utf-8") as f:
            f.write(json.dumps(self.skills_cache))

    def update_category_similarities(self):
        self.update_similarities(self.PATH_TO_CATEGORIES, "category_similarities")
        return self

    def update_technology_similarities(self):
        self.update_similarities(self.PATH_TO_TECHNOLOGIES, "technology_similarities")
        return self

    def update_similarities(self, path_to_file, key):
        with open(path_to_file, encoding="utf-8") as f:
            categories = json.load(f)

        category_hints = {}

        for c in categories.keys():
            print(c)
            title = categories[c]["hint"]
            category_similar_skills = []
            for skill in categories[c]["examples"]:
                similar_skills = filter(
                    lambda x: re.search(skill, x["name"]), self.all_skills
                )
                category_similar_skills += similar_skills

            category_hints[c] = {
                "title": f"{c}. {title}",
                "similar_skills": category_similar_skills,
            }

        category_names = []

        BATCH_SIZE = 100
        for category in category_hints:
            print(category)
            title = category_hints[category]["title"]
            similar_skills = [
                x["translation"] if x["translation"] is not None else x["name"]
                for x in category_hints[category]["similar_skills"]
            ]
            for _ in range(BATCH_SIZE):
                np.random.shuffle(similar_skills)
                name = f"{title}. Examples: {', '.join(similar_skills[0:3])}"
                category_names.append(name)
                print(f"new name: {name}")

        from sentence_transformers import SentenceTransformer

        model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")
        all_embeddings = model.encode(
            category_names, show_progress_bar=True, batch_size=8, device="cuda:0"
        )

        embeddings_batches = np.split(
            all_embeddings, np.arange(BATCH_SIZE, len(all_embeddings), BATCH_SIZE)
        )
        category_embeddings = [np.mean(batch, axis=0) for batch in embeddings_batches]

        for i, s in enumerate(self.skills_cache.keys()):
            if i % 500 == 0:
                print(f"{i}/{len(self.skills_cache.keys())}")
            target_embedding = self.skills_cache[s]["embedding"]
            dots = []
            for embedding in category_embeddings:
                category_embedding = embedding.tolist()
                dots.append(
                    np.dot(
                        target_embedding / np.linalg.norm(target_embedding),
                        category_embedding / np.linalg.norm(category_embedding),
                    )
                )
            self.skills_cache[s][key] = dots

        with open(self.PATH_TO_SKILLS, "w", encoding="utf-8") as f:
            f.write(json.dumps(self.skills_cache))

    def get_vector(self, skill_name, weights=[1, 1, 1, 1]):
        weights = np.array(weights)
        weights = weights / np.sum(weights)

        if skill_name not in self.skills_cache:
            # print(f"skill {skill_name} not found")
            return None

        skill = self.skills_cache[skill_name]
        vector = np.concatenate(
            [
                np.array(skill["cooc"]) * weights[0],
                np.array(skill["embedding"]) * weights[1],
                np.array(skill["category_similarities"]) * weights[2],
                np.array(skill["technology_similarities"]) * weights[3],
            ]
        )
        return vector / np.linalg.norm(vector)

    def get_similar_skills(self, skill_name):
        similar_skills = pd.read_sql(
            f"""
            SELECT KeySkill.name, count(*) FROM KeySkill
                LEFT JOIN KeySkillTranslation ON KeySkillTranslation.name = KeySkill.name
                WHERE KeySkill.name ~* $${skill_name}$$
                GROUP BY KeySkill.name, KeySkillTranslation.name
                ORDER BY count DESC
            """,
            con=self.CONNECTION_URL,
        ).to_dict("records")
        return list(map(lambda x: x["name"], similar_skills))

    def get_skill_probability_estimation(self, skill_name, category_skills):
        estimation = []

        for category in category_skills.keys():
            estimation.append(
                category_skills[category][skill_name]
                if skill_name in category_skills[category]
                else 0
            )
        estimation = np.array(estimation)
        return estimation / np.sum(estimation)

    def get_cluster_skills(self, skills_list, for_other=False):
        if not skills_list:
            return {}

        cursor = self.CONNECTION_URL.cursor()

        cursor.execute("DROP TABLE IF EXISTS tmp_skills")
        cursor.execute("CREATE TEMP TABLE tmp_skills (pattern TEXT)")
        for skill in skills_list:
            cursor.execute("INSERT INTO tmp_skills VALUES (%s)", (skill,))

        query = f"""
            SELECT ks.name, COUNT(*) 
            FROM KeySkill ks
            WHERE ks.vacancy_id {"NOT IN" if for_other else "IN"} (
                SELECT DISTINCT ks_inner.vacancy_id
                FROM KeySkill ks_inner
                JOIN tmp_skills ts ON ks_inner.name ~* ts.pattern
            )
            GROUP BY ks.name
            ORDER BY COUNT(*) DESC
        """

        cursor.execute(query)
        similar_skills = cursor.fetchall()
        cursor.close()

        if not similar_skills:
            return {}

        max_count = similar_skills[0][1]
        return {name: count / max_count for name, count in similar_skills}

    def update_domains(self, skills, categories, predictions):
        cursor = self.CONNECTION_URL.cursor()
        cursor.execute("TRUNCATE KeySkillDomain CASCADE")
        cursor.execute("TRUNCATE Domain CASCADE")

        for category in categories.keys():
            print(category)
            cursor.execute("INSERT INTO Domain (name) VALUES(%s)", (category,))

        cursor.execute("SELECT * FROM Domain")
        db_categories = cursor.fetchall()
        category_id = {}
        for c in db_categories:
            category_id[c[1]] = c[0]

        KEYS = list(categories.keys())
        for i, skill in enumerate(skills):
            print(f"{i}/{len(skills)}")

            predictions_with_labels = sorted(
                zip(KEYS, predictions[i]), key=lambda x: x[1], reverse=True
            )

            inserted = 0
            MIN_INSERTED = 10
            for category, confidence in predictions_with_labels:
                if inserted < MIN_INSERTED:
                    cursor.execute(
                        "INSERT INTO KeySkillDomain (domain_id, name, confidence) VALUES(%s, %s, %s)",
                        (category_id[category], skill, confidence),
                    )
                    inserted += 1
        self.CONNECTION_URL.commit()

    def update_categories(self, skills, categories, predictions):
        cursor = self.CONNECTION_URL.cursor()
        cursor.execute("TRUNCATE KeySkillCategory CASCADE")
        cursor.execute("TRUNCATE Category CASCADE")

        for category in categories.keys():
            print(category)
            cursor.execute("INSERT INTO Category (name) VALUES(%s)", (category,))

        cursor.execute("SELECT * FROM Category")
        db_categories = cursor.fetchall()
        category_id = {}
        for c in db_categories:
            category_id[c[1]] = c[0]

        KEYS = list(categories.keys())
        for i, skill in enumerate(skills):
            print(f"{i}/{len(skills)}")

            predictions_with_labels = sorted(
                zip(KEYS, predictions[i]), key=lambda x: x[1], reverse=True
            )

            inserted = 0
            MIN_INSERTED = 10
            for category, confidence in predictions_with_labels:
                if inserted < MIN_INSERTED:
                    cursor.execute(
                        "INSERT INTO KeySkillCategory (category_id, name, confidence) VALUES(%s, %s, %s)",
                        (category_id[category], skill, confidence),
                    )
                    inserted += 1
        self.CONNECTION_URL.commit()

    def update_similar_skills(self):
        skill_vectors = {}
        for skill in self.all_skills:
            if skill["count"] >= 5:
                vector = self.get_vector(skill["name"], [1, 1000, 1, 1000])
                if vector is not None:
                    skill_vectors[skill["name"]] = vector

        skills_list = list(skill_vectors.keys())
        all_similarities = []

        for i, target_name in enumerate(skills_list):
            print(f"Processing {i}/{len(skills_list)}")
            target_vector = skill_vectors[target_name]

            similarities = []
            for skill_name in skills_list:
                if skill_name != target_name:
                    skill_vector = skill_vectors[skill_name]
                    similarity = np.dot(target_vector, skill_vector)
                    similarities.append((skill_name, similarity))

            similarities.sort(key=lambda x: x[1], reverse=True)
            top_similar = similarities[:100]

            for skill_name, similarity in top_similar:
                skill1, skill2 = sorted([target_name, skill_name])
                all_similarities.append((skill1, skill2, similarity))

        print(f"Inserting {len(all_similarities)} similarity records...")
        cursor = self.CONNECTION_URL.cursor()
        cursor.execute("TRUNCATE KeySkillSimilarity CASCADE")

        for skill1, skill2, similarity in all_similarities:
            cursor.execute(
                "INSERT INTO KeySkillSimilarity (skill1, skill2, similarity_score) VALUES (%s, %s, %s) ON CONFLICT (skill1, skill2) DO NOTHING",
                (skill1, skill2, similarity),
            )

        self.CONNECTION_URL.commit()
        print("Done!")
