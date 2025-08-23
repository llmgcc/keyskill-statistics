from sqlmodel import Session, select, func, case
from src.database import engine
from src.models import KeySkill, Vacancy
from src.config import settings

def analyze_complexity_percentiles():
    with Session(engine) as session:
        complexity_query = select(
            KeySkill.name,
            (
                func.sum(
                    case(
                        (Vacancy.experience == "unknown", 0.0),
                        (Vacancy.experience == "noExperience", 0.0),
                        (Vacancy.experience == "between1And3", 0.3),
                        (Vacancy.experience == "between3And6", 0.7),
                        (Vacancy.experience == "moreThan6", 1.0),
                        else_=0.0,
                    )
                ) / func.count()
            ).label("complexity_score")
        ).select_from(KeySkill).join(
            Vacancy, Vacancy.id == KeySkill.vacancy_id
        ).where(
            Vacancy.created_at.between(settings.min_date, settings.max_date)
        ).group_by(KeySkill.name).having(
            func.count() >= settings.skills_min_count
        )
        percentiles = [16.67, 33.33, 50, 66.67, 83.33]
        
        percentile_query = select(*[
            func.percentile_cont(p/100).within_group(complexity_query.c.complexity_score).label(f'p{p}')
            for p in percentiles
        ]).select_from(complexity_query)
        
        result = session.exec(percentile_query).first()
        boundaries = [0]
        for p in percentiles:
            boundaries.append(getattr(result, f'p{p}'))
        boundaries.append(1.0)
        
        level_names = ['Junior', 'Junior+', 'Middle', 'Middle+', 'Senior', 'Senior+']

        print("Grades:")
        for i in range(len(level_names)):
            print(f"{level_names[i]}: {boundaries[i]:.4f} - {boundaries[i+1]:.4f}")

if __name__ == "__main__":
    analyze_complexity_percentiles()
