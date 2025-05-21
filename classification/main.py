from categories_classifier import CategoriesClassifier
from domains_classifier import DomainsClassifier

(DomainsClassifier().search(1000).fill_db())
(CategoriesClassifier().search(1000).fill_db())
