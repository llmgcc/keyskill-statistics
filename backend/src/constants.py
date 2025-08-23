from sqlmodel import Enum


class Experience(str, Enum):
    any = "any"
    noExperience = "noExperience"
    between1And3 = "between1And3"
    between3And6 = "between3And6"
    moreThan6 = "moreThan6"
