import sklearn.linear_model
from database import SkillDatabase
import os
import json
import numpy as np
import sklearn
import optuna
import logging
import sys
import pickle
from utils import make_dataset, write_results, get_vectors, cross_entropy


class CategoriesClassifier:
    def __init__(self):
        with open(
            os.path.dirname(os.path.abspath(__file__)) + "/examples/categories.json",
            encoding="utf-8",
        ) as f:
            self.categories = json.load(f)
        with open(
            os.path.dirname(os.path.abspath(__file__)) + "/best_params/categories.json",
            encoding="utf-8",
        ) as f:
            self.best_params = json.load(f)
        self.skills_db = SkillDatabase()
        self.x, self.y, self.skills = make_dataset(self.categories, self.skills_db)

    def predict(self):
        KEYS = list(self.categories.keys())

        weights = np.array(
            [
                self.best_params["w1"],
                self.best_params["w2"],
                self.best_params["w3"],
                self.best_params["w4"],
            ]
        )
        weights = weights / np.sum(weights)

        classifier_params = {
            k: v
            for k, v in self.best_params.items()
            if k not in ["w1", "w2", "w3", "w4"]
        }

        print(f"Predict with params {classifier_params} -- {weights}")

        X, Y = get_vectors(self.skills_db, self.skills, weights)

        clf = sklearn.linear_model.LogisticRegression(**classifier_params).fit(X, Y)

        with open(
            f"{os.path.dirname(os.path.abspath(__file__))}/models/categories.pkl", "wb"
        ) as f:
            pickle.dump(clf, f)

        write_results("categories", clf, KEYS, self.skills_db, weights)
        return self

    def search(self, trials, NUM_SKILLS_TO_TRAIN=1000):
        estimations = []
        for i in range(len(self.y)):
            z = np.zeros(len(list(self.categories.keys())))
            z[self.y[i]] = 1
            estimations.append(z)

        DIRECTION = optuna.study.StudyDirection.MINIMIZE

        def objective(trial):
            solver = trial.suggest_categorical("solver", ["liblinear"])
            penalty = trial.suggest_categorical("penalty", ["l2", "l1"])
            c = trial.suggest_float("C", 0.001, 1)
            fit_intercept = trial.suggest_categorical("fit_intercept", [True, False])
            class_weight = trial.suggest_categorical("class_weight", ["balanced", None])

            w1 = trial.suggest_float("w1", 0, 1)
            w2 = trial.suggest_float("w2", 0, 1)
            w3 = trial.suggest_float("w3", 0, 1)
            w4 = trial.suggest_float("w4", 0, 1)

            params = {
                "solver": solver,
                "penalty": penalty,
                "C": c,
                "fit_intercept": fit_intercept,
                "class_weight": class_weight,
                "n_jobs": -1,
            }

            if fit_intercept:
                intercept_scaling = trial.suggest_float("intercept_scaling", 0.01, 1)
                params["intercept_scaling"] = intercept_scaling

            if penalty == "l2":
                dual = trial.suggest_categorical("dual", [True, False])
                params["dual"] = dual

            classifier_obj = sklearn.linear_model.LogisticRegression(**params)

            X = []
            Y = []
            weights = np.array([w1, w2, w3, w4])
            weights = weights / np.sum(weights)

            for category, skill in self.skills:
                vector = self.skills_db.get_vector(skill, weights)
                X.append(vector)
                Y.append(category)

            print("start", len(X), len(Y))
            classifier_obj.fit(X, Y)

            predictions = classifier_obj.predict_proba(X)

            loss = 0
            for i in range(len(predictions)):
                if not np.isnan(estimations[i]).any():
                    v = cross_entropy(predictions[i], estimations[i])
                    loss += v

            return loss

        optuna.logging.get_logger("optuna").addHandler(
            logging.StreamHandler(sys.stdout)
        )
        study_name = "optuna_lr_study_tech"
        storage_name = (
            "postgresql://postgres:localdbpass@localhost:5432/optuna_lr_study_tech"
        )
        study = optuna.create_study(
            direction=DIRECTION,
            study_name=study_name,
            storage=storage_name,
            load_if_exists=True,
        )
        study.optimize(objective, n_trials=trials, n_jobs=-1)

        self.best_params = study.best_params
        with open(
            f"{os.path.dirname(os.path.abspath(__file__))}/best_params/categories.json",
            "w",
            encoding="utf-8",
        ) as file:
            file.write(json.dumps(study.best_params))
        return self

    def fill_db(self):
        with open(
            f"{os.path.dirname(os.path.abspath(__file__))}/models/categories.pkl", "rb"
        ) as f:
            clf = pickle.load(f)
        with open(
            f"{os.path.dirname(os.path.abspath(__file__))}/best_params/categories.json",
            "rb",
        ) as f:
            best_params = json.load(f)

        weights = np.array(
            [best_params["w1"], best_params["w2"], best_params["w3"], best_params["w4"]]
        )
        weights = weights / np.sum(weights)

        skills = self.skills_db.get_all_skills()
        vectors = [self.skills_db.get_vector(s, weights) for s in skills]
        predictions = clf.predict_proba(vectors)

        self.skills_db.update_categories(skills, self.categories, predictions)
