import sklearn.linear_model
import sklearn.metrics
import sklearn.svm
from database import SkillDatabase
import os
import json
import numpy as np
import warnings
import sklearn
from sklearn.model_selection import train_test_split
import optuna
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report
import logging
import sys
import pickle
from utils import make_dataset

class DomainsClassifier:
    def __init__(self):
        with open(os.path.dirname(os.path.abspath(__file__)) + '/examples/domains.json', encoding='utf-8') as f:
            self.domains = json.load(f)
        with open(os.path.dirname(os.path.abspath(__file__)) + '/domains_best_params.json', encoding='utf-8') as f:
            self.best_params = json.load(f)
        self.skills_db = SkillDatabase()
        self.x, self.y, self.skills = make_dataset(self.domains, self.skills_db)

    def predict(self):
        KEYS = list(self.categories.keys())

        weights = np.array([self.best_params['w1'], self.best_params['w2'], self.best_params['w3'], self.best_params['w4']])
        weights = weights / np.sum(weights)

        del self.best_params['w1']
        del self.best_params['w2']
        del self.best_params['w3']
        del self.best_params['w4']
        
        print(f'Predict with params {self.best_params} -- {weights}')

        X = []
        Y = []
        for category, skill in self.skills:
            vector = self.skills_db.get_vector(skill, weights)
            X.append(vector)
            Y.append(category)


        clf = sklearn.linear_model.LogisticRegression(**self.best_params).fit(X, Y)

        with open(f'{os.path.dirname(os.path.abspath(__file__))}/classifier_domains.pkl','wb') as f:
            pickle.dump(clf,f)

        predictions = []

        for s in self.skills_db.get_all_skills()[:]:
            vector = self.skills_db.get_vector(s, weights)
            prediction = clf.predict_proba([vector])[0]
            predictions.append((s, prediction))

        with open(f'{os.path.dirname(os.path.abspath(__file__))}/results/SORTED.md', 'w', encoding="utf-8") as file:
            for name, probs in predictions:
                sorted_probs = sorted(zip(KEYS, probs), key=lambda x: x[1], reverse=True)
                sorted_probs = list(map(lambda x: f'({x[0]} {x[1]})', sorted_probs))
                file.write("{} {}\n".format(name,' '.join(sorted_probs[0:3])))

        with open(f'{os.path.dirname(os.path.abspath(__file__))}/results/SORTEDds.md', 'w', encoding="utf-8") as file:
            for name, probs in predictions:
                sorted_probs = sorted(zip(KEYS, probs), key=lambda x: x[1], reverse=True)
                sorted_probs = list(map(lambda x: f'({x[0]} {x[1]})', sorted_probs))
                file.write("|{} {}|".format(name,' '.join(sorted_probs[0:3])))

        with open(f'{os.path.dirname(os.path.abspath(__file__))}/results/PROBABILITY_SORTED.md', 'w', encoding="utf-8") as file:
            probability_sorted = sorted(predictions, key=lambda x: np.max(x[1]), reverse=True)
            for name, probs in probability_sorted:
                sorted_probs = sorted(zip(KEYS, probs), key=lambda x: x[1], reverse=True)
                sorted_probs = list(map(lambda x: f'({x[0]} {x[1]})', sorted_probs))
                file.write("{} {}\n".format(name,' '.join(sorted_probs[0:3])))


        for i, k in enumerate(KEYS):
            category_predictions = sorted(predictions, key=lambda x: x[1][i], reverse=True)
            # category_predictions = list(filter(lambda x: np.argmax(x[1]) == i, predictions))
            with open(f'{os.path.dirname(os.path.abspath(__file__))}/results/{k}.md', 'w', encoding="utf-8") as file:
                for name, probs in category_predictions:
                    file.write("{:<25} {:<25}\n".format(name,probs[i]))


        for i, k in enumerate(KEYS):
            category_predictions = list(filter(lambda x: np.argmax(x[1]) == i, predictions))
            category_predictions = sorted(category_predictions, key=lambda x: x[1][i], reverse=True)
            with open(f'{os.path.dirname(os.path.abspath(__file__))}/results/max/{k}.md', 'w', encoding="utf-8") as file:
                for name, probs in category_predictions:
                    file.write("{:<25} {:<25}\n".format(name,probs[i]))

        TOP_MAX = 5000
        for i, k in enumerate(KEYS):
            # category_predictions = sorted(predictions, key=lambda x: x[1][i], reverse=True)
            category_predictions = list(filter(lambda x: np.argmax(x[1]) == i and x[1][i] >= 0.5, predictions[0:TOP_MAX]))
            category_predictions = sorted(category_predictions, key=lambda x: x[1][i], reverse=True)
            with open(f'{os.path.dirname(os.path.abspath(__file__))}/results/top/{k}.md', 'w', encoding="utf-8") as file:
                for name, probs in category_predictions:
                    file.write("{:<25} {:<25}\n".format(name,probs[i]))


        with open(f'{os.path.dirname(os.path.abspath(__file__))}/results/top/UNKNOWN.md', 'w', encoding="utf-8") as file:
            for name, probs in predictions[0:TOP_MAX]:
                max_index = np.argmax(probs)
                if probs[max_index] >= 0.5:
                    continue
                file.write("{:<25} {:<25}\n".format(name, KEYS[max_index], probs[max_index]))
    

    def search(self, trials, NUM_SKILLS_TO_TRAIN = 1000):
        cluster_skills = {}
        for c in self.categories.keys():
            cluster_skills[c] = self.skills_db.get_cluster_skills(self.categories[c]['examples'])


        def cross_entropy(predictions, targets, epsilon=1e-12):
            predictions = np.clip(predictions, epsilon, 1. - epsilon)
            N = predictions.shape[0]
            ce = -np.sum(targets*np.log(predictions+1e-9))/N
            return ce


        DIRECTION = optuna.study.StudyDirection.MINIMIZE
        def objective(trial):
            solver = trial.suggest_categorical('solver', [
                'liblinear'
            ])
            penalty = trial.suggest_categorical('penalty', ['l2', 'l1'])
            c = trial.suggest_float('C', 0.001, 1)
            fit_intercept = trial.suggest_categorical('fit_intercept', [True, False])
            class_weight = trial.suggest_categorical('class_weight', ['balanced', None])

            w1 = trial.suggest_float('w1', 0, 1)
            w2 = trial.suggest_float('w2', 0, 1)
            w3 = trial.suggest_float('w3', 0, 1)
            w4 = trial.suggest_float('w4', 0, 1)

            params = {
                'solver': solver,
                'penalty': penalty,
                'C': c,
                'fit_intercept': fit_intercept,
                'class_weight': class_weight,
                'n_jobs': -1
            }

            if fit_intercept:
                intercept_scaling = trial.suggest_float('intercept_scaling', 0.01, 1)
                params['intercept_scaling'] = intercept_scaling


            if penalty == 'l2':
                dual = trial.suggest_categorical('dual', [True, False])
                params['dual'] = dual

            classifier_obj = sklearn.linear_model.LogisticRegression(**params)


            

            X = []
            Y = []
            weights = np.array([w1, w2, w3, w4])
            weights = weights / np.sum(weights)

            for category, skill in self.skills:
                vector = self.skills_db.get_vector(skill, weights)
                X.append(vector)
                Y.append(category)

            classifier_obj.fit(X, Y)



            SKILLS_TO_TRAIN = self.skills_db.get_all_skills()[:NUM_SKILLS_TO_TRAIN]
            estimations = []
            for s in SKILLS_TO_TRAIN:
                estimations.append(self.skills_db.get_skill_probability_estimation(s, cluster_skills))
            estimations = np.array(estimations)
            vectors = [self.skills_db.get_vector(s, weights) for s in SKILLS_TO_TRAIN]

            predictions = classifier_obj.predict_proba(vectors)

            loss = 0
            for i in range(len(predictions)):
                if not np.isnan(estimations[i]).any():
                    v = cross_entropy(predictions[i], estimations[i])
                    loss += v


            for i, s in enumerate(SKILLS_TO_TRAIN[0:10]):
                prediction = predictions[i]
                estimation = estimations[i]
                print(s)
                print('\t', prediction)
                print('\t', estimation)

            print('WEIGHTS', weights)


            return loss

        optuna.logging.get_logger('optuna').addHandler(logging.StreamHandler(sys.stdout))
        study_name = 'optuna_lr_study_default'
        storage_name = f"postgresql://postgres:localdbpass@localhost:5432/{'optuna_lr_study_tech'}"
        study = optuna.create_study(direction=DIRECTION, study_name=study_name, storage=storage_name, load_if_exists = True)
        study.optimize(objective, n_trials=trials, n_jobs=-1)

            
        self.best_params = study.best_params
        with open(f'{os.path.dirname(os.path.abspath(__file__))}/domains_best_params.json', 'w', encoding="utf-8") as file:
            file.write(json.dumps(study.best_params))
        return self
