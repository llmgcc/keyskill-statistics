import os
import numpy as np


def make_dataset(categories, database):
    x = []
    y = []
    skills = []
    for index, category in enumerate(list(categories.keys())):
        print(f"Category {category}: {index}/{len(list(categories.keys()))}")
        similar_skills = set()
        for skill in categories[category]["examples"]:
            similar_skills = similar_skills.union(database.get_similar_skills(skill))
        for i, s in enumerate(similar_skills):
            print(f"\t {s}: {i}/{len(similar_skills)}")
            vector = database.get_vector(s, [1, 1, 1, 1])
            if vector is not None:
                x.append(vector)
                y.append(index)
                skills.append((index, s))
    return x, y, skills


def write_results(path, clf, categories, skills_db, weights):
    predictions = []

    for s in skills_db.get_all_skills()[:]:
        vector = skills_db.get_vector(s, weights)
        prediction = clf.predict_proba([vector])[0]
        predictions.append((s, prediction))

    with open(
        f"{os.path.dirname(os.path.abspath(__file__))}/results/{path}/sorted.md",
        "w",
        encoding="utf-8",
    ) as file:
        for name, probs in predictions:
            sorted_probs = sorted(
                zip(categories, probs), key=lambda x: x[1], reverse=True
            )
            sorted_probs = list(map(lambda x: f"({x[0]} {x[1]})", sorted_probs))
            file.write("{} {}\n".format(name, " ".join(sorted_probs[0:3])))

    with open(
        f"{os.path.dirname(os.path.abspath(__file__))}/results/{path}/probability_sorted.md",
        "w",
        encoding="utf-8",
    ) as file:
        probability_sorted = sorted(
            predictions, key=lambda x: np.max(x[1]), reverse=True
        )
        for name, probs in probability_sorted:
            sorted_probs = sorted(
                zip(categories, probs), key=lambda x: x[1], reverse=True
            )
            sorted_probs = list(map(lambda x: f"({x[0]} {x[1]})", sorted_probs))
            file.write("{} {}\n".format(name, " ".join(sorted_probs[0:3])))

    for i, k in enumerate(categories):
        category_predictions = sorted(predictions, key=lambda x: x[1][i], reverse=True)
        with open(
            f"{os.path.dirname(os.path.abspath(__file__))}/results/{path}/{k}.md",
            "w",
            encoding="utf-8",
        ) as file:
            for name, probs in category_predictions:
                file.write("{:<25} {:<25}\n".format(name, probs[i]))

    with open(
        f"{os.path.dirname(os.path.abspath(__file__))}/results/{path}/unknown.md",
        "w",
        encoding="utf-8",
    ) as file:
        for name, probs in predictions[0:5000]:
            max_index = np.argmax(probs)
            if probs[max_index] >= 0.5:
                continue
            file.write(
                "{:<25} {:<25}\n".format(
                    name,
                    categories[max_index],
                )
            )


def get_vectors(skills_db, skills, weights):
    X = []
    Y = []
    for category, skill in skills:
        vector = skills_db.get_vector(skill, weights)
        X.append(vector)
        Y.append(category)
    return X, Y


def cross_entropy(predictions, targets, epsilon=1e-12):
    predictions = np.clip(predictions, epsilon, 1.0 - epsilon)
    N = predictions.shape[0]
    ce = -np.sum(targets * np.log(predictions + 1e-9)) / N
    return ce
