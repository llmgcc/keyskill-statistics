from typing import Optional
from sqlmodel import Session, or_, select, func, and_, desc, case
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
from src.common import average_salary_case, get_order_by_clause
from src.keyskills.schemas import SkillOrderByQueryParams
import sqlalchemy
from src.schemas import Pagination, OrderBy
from src.keyskills.schemas import SkillsFilter


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
            func.count().label("exp_count"),
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
                func.coalesce(experience_counts_subquery.c.experience, "unknown"),
                experience_counts_subquery.c.exp_count,
            ).label("experience_counts"),
            (
                func.sum(
                    experience_counts_subquery.c.exp_count
                    * case(
                        (experience_counts_subquery.c.experience == "unknown", 0.00),
                        (
                            experience_counts_subquery.c.experience == "noExperience",
                            0.1,
                        ),
                        (
                            experience_counts_subquery.c.experience == "between1And3",
                            0.3,
                        ),
                        (
                            experience_counts_subquery.c.experience == "between3And6",
                            0.6,
                        ),
                        (experience_counts_subquery.c.experience == "moreThan6", 1),
                        else_=0.00,
                    )
                )
                / func.sum(experience_counts_subquery.c.exp_count)
            ).label("raw_complexity_score"),
        ).group_by(experience_counts_subquery.c.name)
    ).subquery()

    normalized_complexity_subquery = (
        select(
            experience_json_subquery.c.name,
            experience_json_subquery.c.experience_counts,
            experience_json_subquery.c.raw_complexity_score,
            func.cume_dist()
            .over(order_by=experience_json_subquery.c.raw_complexity_score)
            .label("complexity_score"),
        ).select_from(experience_json_subquery)
    ).subquery()

    return normalized_complexity_subquery


def create_all_time_place_subquery():
    all_time_count = func.count().label("all_time_count")

    all_time_base = (
        select(
            KeySkill.name,
            all_time_count,
            func.row_number()
            .over(order_by=desc(all_time_count))
            .label("all_time_place"),
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
    skill_filter=None,
    domain=None,
    strict=False,
    category=None,
):
    if days_period is None:
        current_to = settings.max_date
        current_from = settings.min_date
        prev_to = current_from
        prev_from = prev_to - (current_to - current_from)
    else:
        current_to = settings.max_date
        current_from = current_to - datetime.timedelta(days=days_period)
        prev_to = current_from
        prev_from = prev_to - datetime.timedelta(days=days_period)

    count = (
        func.count()
        .filter(Vacancy.created_at.between(current_from, current_to))
        .label("count")
    )

    prev_count = (
        func.count()
        .filter(Vacancy.created_at.between(prev_from, prev_to))
        .label("prev_count")
    )

    salary = (
        func.percentile_cont(0.5)
        .within_group(average_salary_case())
        .filter(Vacancy.created_at.between(current_from, current_to))
        .label("average_salary")
    )

    prev_salary = (
        func.percentile_cont(0.5)
        .within_group(average_salary_case())
        .filter(Vacancy.created_at.between(prev_from, prev_to))
        .label("prev_average_salary")
    )

    skills_base = (
        select(
            KeySkill.name.label("name"),
            KeySkillTranslation.translation.label("skill_translation"),
            count,
            prev_count,
            func.row_number().over(order_by=desc(count)).label("place"),
            func.row_number().over(order_by=desc(prev_count)).label("prev_place"),
            salary,
            prev_salary,
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(
            and_(
                Vacancy.created_at.between(prev_from, current_to),
                Vacancy.created_at.between(settings.min_date, settings.max_date),
                vacancy_filter if vacancy_filter is not None else True,
            )
        )
        .where(
            Vacancy.experience == (None if experience == "unknown" else experience)
            if experience is not None
            else True
        )
        .where(skill_filter if skill_filter is not None else True)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .outerjoin(KeySkillTranslation, KeySkillTranslation.name == KeySkill.name)
        .group_by(KeySkill.name, KeySkillTranslation.name)
        .having(
            or_(
                salary <= settings.max_salary,
                salary is None,
            )
        )
    )

    skills_base = skills_base.having(count >= settings.skills_min_count)

    skills = select(*skills_base.c).select_from(skills_base)

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
            all_time_place_subquery.c.all_time_place,
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
        .join(
            complexity_subquery,
            complexity_subquery.c.name == skills.c.name,
            isouter=True,
        )
        .join(KeySkillImage, KeySkillImage.name == skills.c.name, isouter=True)
        .join(
            all_time_place_subquery,
            all_time_place_subquery.c.name == skills.c.name,
            isouter=True,
        )
    )
    result_subquery = result.subquery()

    if domain:
        if strict:
            result = select(*result_subquery.c).where(
                sqlalchemy.text(f"domains[1]->>'name' = '{domain}'")
            )
        else:
            result = select(*result_subquery.c).where(
                sqlalchemy.text(
                    f"EXISTS (SELECT 1 FROM unnest(domains) AS d WHERE d->>'name' = '{domain}')"
                )
            )

    if category:
        if strict:
            result = select(*result_subquery.c).where(
                sqlalchemy.text(f"categories[1]->>'name' = '{category}'")
            )
        else:
            result = select(*result_subquery.c).where(
                sqlalchemy.text(
                    f"EXISTS (SELECT 1 FROM unnest(categories) AS d WHERE d->>'name' = '{category}')"
                )
            )

    return result


async def skills_list(
    session: Session,
    pagination: Optional[Pagination] = None,
    filter: Optional[SkillsFilter] = None,
    order_by: Optional[OrderBy] = None,
):
    days_period = filter.period if filter else None
    experience = filter.experience if filter else None
    domain = filter.domain if filter else None
    related_to = filter.related_to if filter else None
    similar_to = filter.similar_to if filter else None
    skill_name = filter.skill if filter else None
    domain = filter.domain if filter else None
    category = filter.category if filter else None
    strict = filter.strict if filter else None
    related_to = filter.related_to if filter else None
    limit = pagination.limit if pagination else None
    offset = pagination.offset if pagination else 0
    descending = order_by.descending if order_by else None
    column = order_by.column if order_by else None

    if related_to:
        current_to = settings.max_date
        current_from = current_to - datetime.timedelta(days=days_period * 2)

        skill_vacancies = (
            select(Vacancy.id)
            .select_from(Vacancy)
            .join(KeySkill, KeySkill.vacancy_id == Vacancy.id)
            .where(
                and_(
                    Vacancy.created_at.between(current_from, current_to),
                    KeySkill.name == related_to,
                )
            )
        ).subquery()

    skills_subquery = get_base_skills(
        days_period=days_period,
        experience=experience,
        skill_filter=(
            and_(
                or_(
                    (
                        KeySkill.name.ilike(f"%{skill_name}%")
                        if skill_name is not None
                        else True
                    ),
                    (
                        KeySkillTranslation.translation.ilike(f"%{skill_name}%")
                        if skill_name is not None
                        else True
                    ),
                ),
                KeySkill.name != related_to if related_to is not None else True,
            )
        ),
        vacancy_filter=Vacancy.id.in_(select(skill_vacancies.c.id))
        if related_to is not None
        else True,
        strict=strict,
        domain=domain,
        category=category,
    )

    if similar_to:
        similar_skill_names = (
            select(
                case(
                    (
                        KeySkillSimilarity.skill1 == similar_to,
                        KeySkillSimilarity.skill2,
                    ),
                    else_=KeySkillSimilarity.skill1,
                ).label("skill_name"),
                KeySkillSimilarity.similarity_score,
            )
            .where(
                or_(
                    KeySkillSimilarity.skill1 == similar_to,
                    KeySkillSimilarity.skill2 == similar_to,
                )
            )
            .order_by(KeySkillSimilarity.similarity_score.desc())
            .subquery()
        )

        original_skills = skills_subquery.alias("original_skills")

        skills_subquery = (
            select(
                *original_skills.c,
                similar_skill_names.c.similarity_score.label("similarity_score"),
            )
            .select_from(
                original_skills.join(
                    similar_skill_names,
                    original_skills.c.name == similar_skill_names.c.skill_name,
                )
            )
            .subquery()
        )

    rows = (
        await session.exec(
            select(func.count(func.distinct(skills_subquery.c.name))).select_from(
                skills_subquery
            )
        )
    ).one()

    print("test\n\n\n\n\n\n", order_by, descending, column)
    skills = (
        select(*skills_subquery.c)
        .select_from(skills_subquery)
        .order_by(*get_order_by_clause(skills_subquery, column, descending))
        .limit(limit)
        .offset(offset)
    )

    return {
        "skills": (await session.exec(skills)).all(),
        "rows": rows,
    }


async def favourites(
    session: Session,
    names: list[str],
    pagination: Optional[Pagination] = None,
    filter: Optional[SkillsFilter] = None,
    order_by: Optional[OrderBy] = None,
):
    days_period = filter.period if filter else None
    experience = filter.experience if filter else None
    limit = pagination.limit if pagination else None
    offset = pagination.offset if pagination else 0
    descending = order_by.descending if order_by else None
    column = order_by.column if order_by else None

    skills_subquery = get_base_skills(
        days_period=days_period,
        experience=experience,
    )

    filtered = (
        select(*skills_subquery.c)
        .select_from(skills_subquery)
        .where(skills_subquery.c.name.in_(names))
    ).subquery()

    rows = (
        await session.exec(
            select(func.count(func.distinct(filtered.c.name))).select_from(filtered)
        )
    ).one()
    skills = (
        select(*filtered.c)
        .select_from(filtered)
        .order_by(*get_order_by_clause(filtered, column, descending))
        .limit(limit)
        .offset(offset)
    )
    return {
        "skills": (await session.exec(skills)).all(),
        "rows": rows,
    }


async def skill_details(
    session: Session,
    filter: Optional[SkillsFilter] = None,
):
    days_period = filter.period if filter else None
    experience = filter.experience if filter else None
    skill_name = filter.skill if filter else None

    categories_subquery = create_categories_subquery()
    technologies_subquery = create_technology_subquery()

    base_skill = (
        select(
            KeySkill.name.label("name"),
            KeySkillTranslation.translation.label("translation"),
            KeySkillImage.image,
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(
            and_(
                Vacancy.created_at.between(settings.min_date, settings.max_date),
                KeySkill.name == skill_name,
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
            skills_subquery.c.complexity_score,
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


async def related_skills(
    session: Session,
    skill_name: str,
    days_period=14,
    offset=0,
    limit=20,
    experience=None,
    order_by: SkillOrderByQueryParams = None,
):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period * 2)

    skill_vacancies = (
        select(Vacancy.id)
        .select_from(Vacancy)
        .join(KeySkill, KeySkill.vacancy_id == Vacancy.id)
        .where(
            and_(
                Vacancy.created_at.between(current_from, current_to),
                KeySkill.name == skill_name,
            )
        )
    ).subquery()

    skills_subquery = get_base_skills(
        days_period=days_period,
        experience=experience,
        vacancy_filter=Vacancy.id.in_(select(skill_vacancies.c.id)),
        skill_filter=KeySkill.name != skill_name,
    ).subquery()

    skills = (
        select(*skills_subquery.c)
        .select_from(skills_subquery)
        .order_by(*get_order_by_clause(skills_subquery, order_by))
    )

    rows = (
        await session.exec(
            select(func.count(func.distinct(skills.c.name))).select_from(skills)
        )
    ).one()

    return {
        "skills": (await session.exec(skills.offset(offset).limit(limit))).all(),
        "rows": rows,
    }


async def similar_skills(
    session: Session,
    skill_name: str,
    days_period: int = 15,
    experience: str = None,
    limit: int = 10,
    offset: int = 0,
    order_by=None,
):
    similar_skill_names = (
        select(
            case(
                (KeySkillSimilarity.skill1 == skill_name, KeySkillSimilarity.skill2),
                else_=KeySkillSimilarity.skill1,
            ).label("skill_name"),
            KeySkillSimilarity.similarity_score,
        )
        .where(
            or_(
                KeySkillSimilarity.skill1 == skill_name,
                KeySkillSimilarity.skill2 == skill_name,
            )
        )
        .order_by(KeySkillSimilarity.similarity_score.desc())
        .subquery()
    )

    base_skills = get_base_skills(days_period, experience).subquery()

    similar_skills = (
        select(
            *base_skills.c,
            similar_skill_names.c.similarity_score.label("similarity_score"),
        )
        .select_from(
            base_skills.join(
                similar_skill_names,
                base_skills.c.name == similar_skill_names.c.skill_name,
            )
        )
        .subquery()
    )

    skills = (
        select(*similar_skills.c)
        .select_from(similar_skills)
        .order_by(*get_order_by_clause(similar_skills, order_by))
    )

    rows = (
        await session.exec(
            select(func.count(func.distinct(skills.c.name))).select_from(skills)
        )
    ).one()

    return {
        "skills": (await session.exec(skills.offset(offset).limit(limit))).all(),
        "rows": rows,
    }


async def get_all_skills_related(session: Session, period: int, experience: str = None):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=period)

    skill_vacancies = (
        select(KeySkill.name.label("main_skill"), Vacancy.id.label("vacancy_id"))
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(
            and_(
                Vacancy.created_at.between(
                    current_to - datetime.timedelta(days=period * 2), current_to
                ),
                Vacancy.experience == (None if experience == "unknown" else experience)
                if experience
                else True,
            )
        )
    ).subquery()

    related_skills_ranked = (
        select(
            skill_vacancies.c.main_skill,
            KeySkill.name,
            func.count()
            .filter(Vacancy.created_at.between(current_from, current_to))
            .label("count"),
            func.count()
            .filter(Vacancy.created_at.between(prev_from, prev_to))
            .label("prev_count"),
            func.percentile_cont(0.5)
            .within_group(average_salary_case())
            .filter(Vacancy.created_at.between(current_from, current_to))
            .label("average_salary"),
            func.percentile_cont(0.5)
            .within_group(average_salary_case())
            .filter(Vacancy.created_at.between(prev_from, prev_to))
            .label("prev_average_salary"),
            KeySkillImage.image,
            KeySkillTranslation.translation,
            func.row_number()
            .over(
                partition_by=skill_vacancies.c.main_skill,
                order_by=func.count()
                .filter(Vacancy.created_at.between(current_from, current_to))
                .desc(),
            )
            .label("place"),
            func.row_number()
            .over(
                partition_by=skill_vacancies.c.main_skill,
                order_by=func.count()
                .filter(Vacancy.created_at.between(prev_from, prev_to))
                .desc(),
            )
            .label("prev_place"),
        )
        .select_from(skill_vacancies)
        .join(
            KeySkill,
            and_(
                KeySkill.vacancy_id == skill_vacancies.c.vacancy_id,
                KeySkill.name != skill_vacancies.c.main_skill,
            ),
        )
        .join(Vacancy, Vacancy.id == skill_vacancies.c.vacancy_id)
        .outerjoin(
            VacancySalary, VacancySalary.vacancy_id == skill_vacancies.c.vacancy_id
        )
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .outerjoin(KeySkillImage, KeySkillImage.name == KeySkill.name)
        .outerjoin(KeySkillTranslation, KeySkillTranslation.name == KeySkill.name)
        .where(Vacancy.created_at.between(prev_from, current_to))
        .group_by(
            skill_vacancies.c.main_skill,
            KeySkill.name,
            KeySkillImage.image,
            KeySkillTranslation.translation,
        )
        .having(
            func.count().filter(Vacancy.created_at.between(current_from, current_to))
            >= (settings.skills_min_count or 5)
        )
    ).subquery()

    final_query = (
        select(
            related_skills_ranked.c.main_skill.label("skill_name"),
            func.json_agg(
                func.json_build_object(
                    "name",
                    related_skills_ranked.c.name,
                    "count",
                    related_skills_ranked.c.count,
                    "prev_count",
                    related_skills_ranked.c.prev_count,
                    "place",
                    related_skills_ranked.c.place,
                    "prev_place",
                    related_skills_ranked.c.prev_place,
                    "average_salary",
                    related_skills_ranked.c.average_salary,
                    "prev_average_salary",
                    related_skills_ranked.c.prev_average_salary,
                    "image",
                    related_skills_ranked.c.image,
                    "translation",
                    related_skills_ranked.c.translation,
                )
            ).label("related_skills"),
        )
        .select_from(related_skills_ranked)
        .group_by(related_skills_ranked.c.main_skill)
        .order_by(related_skills_ranked.c.main_skill)
    )

    return await session.exec(final_query)


async def get_all_skills_similar(session: Session):
    from src.models import KeySkillSimilarity

    valid_skills = (
        select(func.distinct(KeySkill.name).label("skill_name"))
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(Vacancy.created_at.between(settings.min_date, settings.max_date))
    ).subquery()

    query = (
        select(
            KeySkillSimilarity.skill1.label("skill_name"),
            KeySkillSimilarity.skill2.label("similar_skill"),
            KeySkillSimilarity.similarity_score,
        )
        .where(
            and_(
                KeySkillSimilarity.skill1.in_(select(valid_skills.c.skill_name)),
                KeySkillSimilarity.skill2.in_(select(valid_skills.c.skill_name)),
            )
        )
        .union_all(
            select(
                KeySkillSimilarity.skill2.label("skill_name"),
                KeySkillSimilarity.skill1.label("similar_skill"),
                KeySkillSimilarity.similarity_score,
            ).where(
                and_(
                    KeySkillSimilarity.skill1.in_(select(valid_skills.c.skill_name)),
                    KeySkillSimilarity.skill2.in_(select(valid_skills.c.skill_name)),
                )
            )
        )
    ).subquery()

    final_query = (
        select(
            query.c.skill_name,
            func.array_agg(
                func.json_build_object(
                    "name",
                    query.c.similar_skill,
                    "similarity_score",
                    query.c.similarity_score,
                )
            ).label("similar_skills"),
        )
        .select_from(query)
        .group_by(query.c.skill_name)
    )

    return await session.exec(final_query)
