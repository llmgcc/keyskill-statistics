from sqlmodel import Session, or_, select, func, and_, cast, Date, desc, extract, case
from src.models import (
    KeySkill,
    KeySkillSimilarity,
    Vacancy,
    KeySkillImage,
    VacancySalary,
    Currency,
    Category,
    Domain,
    KeySkillCategory,
    KeySkillDomain,
    KeySkillTranslation,
)
import datetime
from sqlalchemy.dialects.postgresql import aggregate_order_by, array_agg
from src.config import settings
from src.common import average_salary_case
from src.keyskills.schemas import SkillOrderByQueryParams
from sqlalchemy import nullslast


def create_categories_subquery():
    json_object = func.json_build_object(
        "name", Domain.name, "confidence", KeySkillDomain.confidence
    )
    categories_subquery = (
        select(
            KeySkillDomain.name,
            array_agg(
                aggregate_order_by(json_object, KeySkillDomain.confidence.desc())
            ).label("categories"),
        )
        .select_from(KeySkillDomain)
        .join(Domain, Domain.id == KeySkillDomain.domain_id)
        .group_by(KeySkillDomain.name)
    ).subquery()

    return categories_subquery

def create_technology_subquery():
    json_object = func.json_build_object(
        "name", Category.name, "confidence", KeySkillCategory.confidence
    )
    categories_subquery = (
        select(
            KeySkillCategory.name,
            array_agg(
                aggregate_order_by(json_object, KeySkillCategory.confidence.desc())
            ).label("categories"),
        )
        .select_from(KeySkillCategory)
        .join(Category, Category.id == KeySkillCategory.category_id)
        .group_by(KeySkillCategory.name)
    ).subquery()

    return categories_subquery


def create_complexity_subquery(current_from, current_to):
    experience_counts_subquery = (
        select(
            KeySkill.name,
            Vacancy.experience.label("experience"),
            func.count().label("exp_count")
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(Vacancy.created_at.between(current_from, current_to))
        .group_by(KeySkill.name, Vacancy.experience)
    ).subquery()

    experience_json_subquery = (
        select(
            experience_counts_subquery.c.name,
            func.json_object_agg(
                func.coalesce(experience_counts_subquery.c.experience, 'unknown'),
                experience_counts_subquery.c.exp_count
            ).label("experience_counts"),
            (func.sum(
                experience_counts_subquery.c.exp_count * 
                case(
                    (experience_counts_subquery.c.experience == 'unknown', 0.00),
                    (experience_counts_subquery.c.experience == 'noExperience', 0.1),
                    (experience_counts_subquery.c.experience == 'between1And3', 0.3),
                    (experience_counts_subquery.c.experience == 'between3And6', 0.6),
                    (experience_counts_subquery.c.experience == 'moreThan6', 1),
                    else_=0.00
                )
            ) / func.sum(experience_counts_subquery.c.exp_count)).label("raw_complexity_score")
        )
        .group_by(experience_counts_subquery.c.name)
    ).subquery()

    normalized_complexity_subquery = (
        select(
            experience_json_subquery.c.name,
            experience_json_subquery.c.experience_counts,
            experience_json_subquery.c.raw_complexity_score,
            func.cume_dist()
                .over(order_by=experience_json_subquery.c.raw_complexity_score)
                .label("complexity_score")
        )
        .select_from(experience_json_subquery)
    ).subquery()

    return normalized_complexity_subquery

def create_all_time_place_subquery():
    all_time_count = func.count().label("all_time_count")
    
    all_time_base = (
        select(
            KeySkill.name,
            all_time_count,
            func.row_number().over(order_by=desc(all_time_count)).label("all_time_place")
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(
            Vacancy.created_at.between(settings.min_date, settings.max_date),
        )
        .group_by(KeySkill.name)
    )
    
    return all_time_base.subquery()

def get_base_skills(
    days_period,
    experience=None,
    vacancy_filter=None,
    skill_filter=None
):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)

    count = (
        func.count()
        .filter(Vacancy.created_at.between(current_from, current_to))
        .label("count")
    )

    all_time_count = (
        func.count()
        .filter(Vacancy.created_at.between(settings.min_date, settings.max_date))
        .label("all_time_count")
    )

    prev_count = (
        func.count()
        .filter(Vacancy.created_at.between(prev_from, prev_to))
        .label("prev_count")
    )

    salary = (func.percentile_cont(0.5)
            .within_group(average_salary_case())
            .filter(Vacancy.created_at.between(current_from, current_to))
            .label("average_salary"))
    
    prev_salary = (func.percentile_cont(0.5)
            .within_group(average_salary_case())
            .filter(Vacancy.created_at.between(prev_from, prev_to))
            .label("prev_average_salary"))

    skills_base = (
        select(
            KeySkill.name.label("name"),
            KeySkillTranslation.translation.label("skill_translation"),
            count,
            prev_count,
            func.row_number().over(order_by=desc(count)).label("place"),
            func.row_number().over(order_by=desc(prev_count)).label("prev_place"),
            salary,
            prev_salary
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(
            and_(
                Vacancy.created_at.between(prev_from, current_to),
                Vacancy.created_at.between(settings.min_date, settings.max_date),
                vacancy_filter if vacancy_filter is not None else True
            )
        )
        .where(Vacancy.experience == (None if experience == 'unknown' else experience) if experience is not None else True)
        .where(skill_filter if skill_filter is not None else True)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .outerjoin(KeySkillTranslation, KeySkillTranslation.name == KeySkill.name)
        .group_by(KeySkill.name, KeySkillTranslation.name)
        .having(
            or_(
                salary <= settings.max_salary,
                salary == None,
            )
        )
    )

    skills_base = skills_base.having(count >= settings.skills_min_count)

    skills = (
        select(*skills_base.c)
        .select_from(skills_base)
    )

    categories_subquery = create_categories_subquery()
    technologies_subquery = create_technology_subquery()
    complexity_subquery = create_complexity_subquery(current_from, current_to)
    all_time_place_subquery = create_all_time_place_subquery()

    result = (
        select(
            *skills.c,
            categories_subquery.c.categories.label("domains"),
            technologies_subquery.c.categories.label("categories"),
            KeySkillImage.image,
            skills.c.skill_translation.label("translation"),
            (skills.c.count / func.max(skills_base.c.count).select()).label("ratio"),
            complexity_subquery.c.experience_counts,
            complexity_subquery.c.complexity_score,
            all_time_place_subquery.c.all_time_place
        )
        .select_from(skills)
        .join(
            categories_subquery,
            categories_subquery.c.name == skills.c.name,
            isouter=True,
        )
        .join(
            technologies_subquery,
            technologies_subquery.c.name == skills.c.name,
            isouter=True,
        )
        .join(complexity_subquery, complexity_subquery.c.name == skills.c.name, isouter=True)
        .join(KeySkillImage, KeySkillImage.name == skills.c.name, isouter=True)
        .join(all_time_place_subquery, all_time_place_subquery.c.name == skills.c.name, isouter=True)
    )

    return result

async def skills_list(
    session: Session,
    days_period=30,
    limit=20,
    offset=0,
    experience=None,
):
    skills_subquery = get_base_skills(
        days_period=days_period,
        experience=experience,
    )

    rows = (
        await session.exec(
            select(func.count(func.distinct(skills_subquery.c.name))).select_from(
                skills_subquery
            )
        )
    ).one()

    skills = (
        select(*skills_subquery.c)
        .select_from(skills_subquery)
        .order_by(skills_subquery.c.place)
        .limit(limit)
        .offset(offset)
    )  

    return {
        "skills": (await session.exec(skills)).all(),
        "rows": rows,
    }



# async def skill_details(
#     session: Session,
#     skill_name : str,
#     days_period=30,
#     experience=None,
# ):
    
#     skills_subquery = get_base_skills(
#         days_period=days_period,
#         experience=experience,
#     ).subquery()

#     skill_search = (
#         select(
#             KeySkill.name.label("name")
#         )
#         .select_from(KeySkill)
#         .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
#         .where(
#             and_(
#                 Vacancy.created_at.between(settings.min_date, settings.max_date),
#                 KeySkill.name == skill_name
#             )
#         )
#         # .outerjoin(skills_subquery, skills_subquery.c.name == KeySkill.name)
#         .group_by(KeySkill.name)
#     )
    

#     result = (
#         select(
#             skill_search.c.name,
#             skills_subquery.c.place
#         )
#         .select_from(skill_search)
#         .outerjoin(skills_subquery, skills_subquery.c.name == KeySkill.name)
#     )

#     return (await session.exec(result)).all()




async def skill_details(
    session: Session,
    skill_name: str,
    days_period=30,
    experience=None,
):
    
    categories_subquery = create_categories_subquery()
    technologies_subquery = create_technology_subquery()

    base_skill = (
        select(
            KeySkill.name.label("name"),
            KeySkillTranslation.translation.label("translation"),
            KeySkillImage.image
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(
            and_(
                Vacancy.created_at.between(settings.min_date, settings.max_date),
                KeySkill.name == skill_name
            )
        )
        .outerjoin(KeySkillTranslation, KeySkillTranslation.name == KeySkill.name)
        .outerjoin(KeySkillImage, KeySkillImage.name == KeySkill.name)
        .group_by(KeySkill.name, KeySkillTranslation.translation, KeySkillImage.image)
    ).subquery()

    skills_subquery = get_base_skills(
        days_period=days_period,
        experience=experience,
    ).subquery()

    result = (
        select(
            base_skill.c.name,
            base_skill.c.translation,
            base_skill.c.image,
            categories_subquery.c.categories.label("domains"),
            technologies_subquery.c.categories.label("categories"),
            skills_subquery.c.count,
            skills_subquery.c.all_time_place,
            skills_subquery.c.prev_count,
            skills_subquery.c.place,
            skills_subquery.c.prev_place,
            skills_subquery.c.average_salary,
            skills_subquery.c.prev_average_salary,
            skills_subquery.c.domains,
            skills_subquery.c.categories,
            skills_subquery.c.ratio,
            skills_subquery.c.experience_counts,
            skills_subquery.c.complexity_score
        )
        .select_from(base_skill)
        .outerjoin(skills_subquery, skills_subquery.c.name == base_skill.c.name)
        .outerjoin(
            categories_subquery,
            categories_subquery.c.name == base_skill.c.name,
        )
        .outerjoin(
            technologies_subquery,
            technologies_subquery.c.name == base_skill.c.name,
        )
    )

    return (await session.exec(result)).first()


def get_order_by_clause(subquery, order_by_param):
    if not order_by_param or not order_by_param.order_by:
        return subquery.c.place
    
    column_name = order_by_param.order_by.value

    if column_name == "change":
        change_expr = ((subquery.c.count - subquery.c.prev_count) / 
                      func.nullif(subquery.c.prev_count, 0) * 100)
        return nullslast(change_expr.desc()) if order_by_param.descending else nullslast(change_expr.asc()) 
    try:
        column = subquery.c[column_name]
        return nullslast(column.desc()) if order_by_param.descending else nullslast(column)
    except KeyError:
        return subquery.c.place

async def related_skills(
    session: Session,
    skill_name: str,
    days_period=14,
    offset=0,
    limit=20,
    experience=None,
    order_by : SkillOrderByQueryParams = None
):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period*2)
    
    skill_vacancies = (
        select(Vacancy.id)
        .select_from(Vacancy)
        .join(KeySkill, KeySkill.vacancy_id == Vacancy.id)
        .where(
            and_(
                Vacancy.created_at.between(current_from, current_to),
                KeySkill.name == skill_name
            )
        )
    ).subquery()

    skills_subquery = get_base_skills(
        days_period=days_period,
        experience=experience,
        vacancy_filter=Vacancy.id.in_(select(skill_vacancies.c.id)),
        skill_filter=KeySkill.name != skill_name
    ).subquery()

    skills = (
        select(*skills_subquery.c)
        .select_from(skills_subquery)
        .order_by(get_order_by_clause(skills_subquery, order_by))
        
    )  

    rows = (
        await session.exec(
            select(func.count(func.distinct(skills.c.name))).select_from(
                skills
            )
        )
    ).one()

    return {
        "skills": (await session.exec(skills.offset(offset).limit(limit))).all(),
        "rows": rows
    }



async def similar_skills(
    session: Session,
    skill_name: str,
    days_period: int = 15,
    experience: str = None,
    limit: int = 10,
    offset: int = 0,
    order_by=None
):
    similar_skill_names = select(
        case(
            (KeySkillSimilarity.skill1 == skill_name, KeySkillSimilarity.skill2),
            else_=KeySkillSimilarity.skill1
        ).label('skill_name'),
        KeySkillSimilarity.similarity_score
    ).where(
        or_(
            KeySkillSimilarity.skill1 == skill_name,
            KeySkillSimilarity.skill2 == skill_name
        )
    ).order_by(
        KeySkillSimilarity.similarity_score.desc()
    ).subquery()
    
    base_skills = get_base_skills(days_period, experience).subquery()
    

    similar_skills = select(
        *base_skills.c,
        similar_skill_names.c.similarity_score.label('similarity_score')
    ).select_from(
        base_skills.join(
            similar_skill_names,
            base_skills.c.name == similar_skill_names.c.skill_name
        )
    ).subquery()
    

    skills = (
        select(*similar_skills.c)
        .select_from(similar_skills)
        .order_by(get_order_by_clause(similar_skills, order_by))
    )
    
    
    rows = (
        await session.exec(
            select(func.count(func.distinct(skills.c.name))).select_from(
                skills
            )
        )
    ).one()

    return {
        "skills": (await session.exec(skills.offset(offset).limit(limit))).all(),
        "rows": rows
    }

