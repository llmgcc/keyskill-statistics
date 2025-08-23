from domains_classifier import DomainsClassifier
from categories_classifier import CategoriesClassifier


SEARCH = 1
(DomainsClassifier().search(SEARCH).predict().fill_db())
(CategoriesClassifier().search(SEARCH).predict().fill_db())
