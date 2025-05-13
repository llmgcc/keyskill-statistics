from sqlmodel import Session, or_, select, func, and_, cast, Date, desc, extract, case
from src.models import (
    KeySkill,
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


def get_base_skills(
    days_period,
    limit,
    offset,
    experience=None,
    min_count=5,
    order_by=None,
    where=None,
    with_total_count=False,
    skill_name = None
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

    prev_count = (
        func.count()
        .filter(Vacancy.created_at.between(prev_from, prev_to))
        .label("prev_count")
    )

    average_salary_case = case(
        (
            and_(
                VacancySalary.salary_from.is_not(None),
                VacancySalary.salary_to.is_not(None),
            ),
            (
                VacancySalary.salary_from / Currency.currency_rate
                + VacancySalary.salary_to / Currency.currency_rate
            )
            / 2,
        ),
        (
            and_(
                VacancySalary.salary_from.is_(None),
                VacancySalary.salary_to.is_not(None),
            ),
            VacancySalary.salary_to / Currency.currency_rate,
        ),
        (
            and_(
                VacancySalary.salary_from.is_not(None),
                VacancySalary.salary_to.is_(None),
            ),
            VacancySalary.salary_from / Currency.currency_rate,
        ),
    )

    skills_base = (
        select(
            KeySkill.name.label("name"),
            KeySkillTranslation.translation.label('translation'),
            count,
            prev_count,
            func.row_number().over(order_by=desc(count)).label("place"),
            func.row_number().over(order_by=desc(prev_count)).label("prev_place"),
            func.percentile_cont(0.5)
            .within_group(average_salary_case)
            .filter(Vacancy.created_at.between(current_from, current_to))
            .label("average_salary"),
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .where(
            and_(
                Vacancy.created_at.between(prev_from, current_to),
                Vacancy.created_at.between(settings.min_date, settings.max_date),
            )
        )
        .where(
            or_(
                func.lower(KeySkill.name).contains(func.lower(skill_name)),
                func.lower(KeySkillTranslation.translation).contains(func.lower(skill_name))
            ) if skill_name else True
        )
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .outerjoin(KeySkillTranslation, KeySkillTranslation.name == KeySkill.name)
        .group_by(KeySkill.name, KeySkillTranslation.name)
    )

    if experience is not None:
        skills_base = skills_base.where(Vacancy.experience == experience)


    skills_base = skills_base.having(count >= min_count)

    skills = (
        select(*skills_base.c)
        .select_from(skills_base)
        .where(where(skills_base) if where else True)
        .where(
            or_(skills_base.c.average_salary <= settings.max_salary, skills_base.c.average_salary == None)
        )
        .order_by(order_by(skills_base) if order_by else skills_base.c.place.asc())
        .offset(offset)
        .limit(limit)
    )

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
                    aggregate_order_by(
                        json_object, KeySkillCategory.confidence.desc()
                    )
                ).label("categories"),
            )
            .select_from(KeySkillCategory)
            .join(Category, Category.id == KeySkillCategory.category_id)
            .group_by(KeySkillCategory.name)
        ).subquery()

        return categories_subquery

    categories_subquery = create_categories_subquery()
    technologies_subquery = create_technology_subquery()

    result = (
        select(
            *skills.c,
            categories_subquery.c.categories.label("domains"),
            technologies_subquery.c.categories.label("categories"),
            KeySkillImage.image,
            skills.c.translation.label("translation"),
            # sqlalchemy.func.json_extract_path(
            #     cast(
            #         categories_subquery.c.categories[1],
            #         sqlalchemy.JSON
            #     ),
            #     'name'
            # ).label("category"),
            #     sqlalchemy.func.json_extract_path(
            #         cast(
            #             categories_subquery.c.categories[1],
            #             sqlalchemy.JSON
            #         ),
            #         'name'
            #     ).label("technology")
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
        .join(KeySkillImage, KeySkillImage.name == skills.c.name, isouter=True)
        .order_by(order_by(skills) if order_by else skills.c.place.asc())
    )

    if with_total_count:
        return result, skills_base
    return result

def get_skills(date_from: datetime.date, date_to: datetime.date):
    count = func.count(KeySkill.name).label("count")
    skills = (
        select(
            KeySkill.name,
            count,
            func.row_number().over(order_by=desc(count)).label("place"),
        )
        .join(
            Vacancy,
            and_(
                KeySkill.vacancy_id == Vacancy.id,
                cast(Vacancy.created_at, Date) <= date_to,
                cast(Vacancy.created_at, Date) > date_from,
            ),
        )
        .group_by(KeySkill.name)
    )
    return skills


def create_chart_subquery(date_from, date_to, number_of_bins):
    right = extract("epoch", date_to)
    left = extract("epoch", date_from)
    bin_size = (right - left) / number_of_bins
    vacancy_date = extract("epoch", cast(Vacancy.created_at, Date))
    bin = func.ceil(((vacancy_date - left) / bin_size)).label("bin")

    bins = (
        select(Vacancy.id, Vacancy.created_at, KeySkill.name, bin)
        .select_from(Vacancy)
        .join(KeySkill, Vacancy.id == KeySkill.vacancy_id)
        .where((cast(Vacancy.created_at, Date) > date_from))
        .where(bin >= 1)
        .where(bin <= number_of_bins)
        .order_by(Vacancy.created_at.desc())
    ).subquery()

    grouped_bins_count = func.count().label("count")
    grouped_bins = (
        select(bins.c.name, bins.c.bin, grouped_bins_count)
        .group_by(bins.c.name, bins.c.bin)
        .order_by(grouped_bins_count.desc())
    )

    bin_label = grouped_bins.c.bin.label("bin")
    json_object = func.json_build_object(
        "bin", bin_label, "count", grouped_bins.c.count
    )
    count_chart = (
        select(
            grouped_bins.c.name,
            func.to_json(
                func.array_agg(aggregate_order_by(json_object, bin_label.asc()))
            ).label("chart"),
        ).group_by(grouped_bins.c.name)
    ).subquery()

    return count_chart


def create_salary_subquery(session, date_from, date_to, number_of_bins):
    average_salary_case = case(
        (
            and_(
                VacancySalary.salary_from.is_not(None),
                VacancySalary.salary_to.is_not(None),
            ),
            (
                VacancySalary.salary_from / Currency.currency_rate
                + VacancySalary.salary_to / Currency.currency_rate
            )
            / 2,
        ),
        (
            and_(
                VacancySalary.salary_from.is_(None),
                VacancySalary.salary_to.is_not(None),
            ),
            VacancySalary.salary_to / Currency.currency_rate,
        ),
        (
            and_(
                VacancySalary.salary_from.is_not(None),
                VacancySalary.salary_to.is_(None),
            ),
            VacancySalary.salary_from / Currency.currency_rate,
        ),
    )

    vacancies = (
        select(
            KeySkill.name.label("name"),
            Vacancy.created_at,
            average_salary_case.label("average_salary"),
            Currency.currency_code,
        )
        .select_from(Vacancy)
        .join(VacancySalary, VacancySalary.vacancy_id == Vacancy.id)
        .join(KeySkill, Vacancy.id == KeySkill.vacancy_id)
        .join(Currency, Currency.currency_code == VacancySalary.currency)
        .where((cast(Vacancy.created_at, Date) > date_from))
    )

    avg_salary = session.exec(select(func.avg(vacancies.c.average_salary))).all()[0]

    right = avg_salary * 6
    left = 0

    bin_size = (right - left) / number_of_bins
    vacancy_average_salary = vacancies.c.average_salary.label("average_salary")
    bin = func.ceil(((vacancy_average_salary - left) / bin_size)).label("bin")
    bins = (
        select(vacancies.c.name, bin, vacancy_average_salary)
        .select_from(vacancies)
        .where((cast(vacancies.c.created_at, Date) > date_from))
        .where(bin >= 1)
        .where(bin <= number_of_bins)
        .order_by(vacancies.c.name.desc())
    ).subquery()

    average_salary_per_skill = (
        select(
            bins.c.name,
            # sqlalchemy.func.median(bins.c.average_salary).label('average_salary')
            func.percentile_cont(0.5)
            .within_group(bins.c.average_salary)
            .label("average_salary"),
        )
        .select_from(bins)
        .group_by(bins.c.name)
    ).subquery()

    grouped_bins_count = func.count().label("count")
    grouped_bins = (
        select(bins.c.name, bins.c.bin, grouped_bins_count)
        .group_by(bins.c.name, bins.c.bin)
        .order_by(grouped_bins_count.desc())
    ).subquery()

    bin_label = grouped_bins.c.bin.label("bin")
    json_object = func.json_build_object(
        "bin", bin_label, "count", grouped_bins.c.count
    )
    salary_chart = (
        select(
            grouped_bins.c.name,
            func.to_json(
                func.array_agg(aggregate_order_by(json_object, bin_label.asc()))
            ).label("salary_chart"),
        ).group_by(grouped_bins.c.name)
    ).subquery()

    salary_chart_with_avg = (
        select(
            salary_chart.c.name,
            salary_chart.c.salary_chart,
            average_salary_per_skill.c.average_salary,
        ).join(
            average_salary_per_skill,
            average_salary_per_skill.c.name == salary_chart.c.name,
        )
    ).subquery()

    return salary_chart_with_avg, right


def create_categories_subquery():
    json_object = func.json_build_object(
        "name", Domain.name, "confidence", KeySkillDomain.confidence
    )
    categories_subquery = (
        select(
            KeySkillDomain.name,
            func.array_agg(
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
            func.array_agg(
                aggregate_order_by(json_object, KeySkillCategory.confidence.desc())
            ).label("categories"),
        )
        .select_from(KeySkillCategory)
        .join(Category, Category.id == KeySkillCategory.category_id)
        .group_by(KeySkillCategory.name)
    ).subquery()

    return categories_subquery


async def skills_list(
    session: Session, category, domain, domainStrict, categoryStrict, skill_name=None, days_period=30, limit=20, offset=0, experience=None, min_count=5,
):
    skills, skills_base = get_base_skills(
        days_period=days_period,
        limit=limit,
        offset=offset,
        min_count=min_count,
        experience=experience,
        with_total_count=True,
        skill_name=skill_name
    )

    current_to = func.now()
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)

    total_count = (await session.exec(
        select(func.count(func.distinct(skills_base.c.name))).select_from(skills_base)
    )).one()

    return {
        "skills": (await session.exec(skills)).all(),
        "count_bins": 1,
        "salary_bins": 1,
        "max_salary": 1,
        "rows": total_count,
    }