


def make_dataset(categories, database):
    x = []
    y = []
    skills = []
    for index, category in enumerate(list(categories.keys())):
        print(f'Category {category}: {index}/{len(list(categories.keys()))}')
        similar_skills = set()
        for skill in categories[category]['examples']:
            similar_skills = similar_skills.union(database.get_similar_skills(skill))
        for i, s in enumerate(similar_skills):
            print(f'\t {s}: {i}/{len(similar_skills)}')
            vector = database.get_vector(s)
            if vector is not None:
                x.append(vector)
                y.append(index)
                skills.append((index, s))
    return x, y