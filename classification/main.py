from categories_classifier import CategoriesClassifier
from domains_classifier import DomainsClassifier


SEARCH = 500
(
    DomainsClassifier()
    .search(SEARCH)
    .predict()
    .fill_db()
)
(
    CategoriesClassifier()
    .search(SEARCH)
    .predict()
    .fill_db()
)
