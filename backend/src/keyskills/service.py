from sqlmodel import Session, select, func, and_, cast, Date, desc, extract, case
from src.models import (
    KeySkill,
    Vacancy,
    KeySkillImage,
    VacancySalary,
    Currency,
    Category,
    Technology,
    KeySkillCategory,
    KeySkillTechnology,
    KeySkillTranslation,
)
import datetime
from sqlalchemy.dialects.postgresql import aggregate_order_by
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
):
    current_to = func.now()
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)

    print(days_period, "days")

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
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .group_by(KeySkill.name)
    )

    if experience is not None:
        skills_base = skills_base.where(Vacancy.experience == experience)

    skills_base = skills_base.having(count >= min_count)

    skills = (
        select(*skills_base.c)
        .select_from(skills_base)
        .order_by(order_by(skills_base) if order_by else skills_base.c.place.asc())
        .where(where(skills_base) if where else True)
        .offset(offset)
        .limit(limit)
    )

    def create_categories_subquery():
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

    def create_technology_subquery():
        json_object = func.json_build_object(
            "name", Technology.name, "confidence", KeySkillTechnology.confidence
        )
        categories_subquery = (
            select(
                KeySkillTechnology.name,
                func.array_agg(
                    aggregate_order_by(
                        json_object, KeySkillTechnology.confidence.desc()
                    )
                ).label("categories"),
            )
            .select_from(KeySkillTechnology)
            .join(Technology, Technology.id == KeySkillTechnology.technology_id)
            .group_by(KeySkillTechnology.name)
        ).subquery()

        return categories_subquery

    categories_subquery = create_categories_subquery()
    technologies_subquery = create_technology_subquery()

    result = (
        select(
            *skills.c,
            categories_subquery.c.categories.label("categories"),
            technologies_subquery.c.categories.label("technologies"),
            KeySkillImage.image,
            KeySkillTranslation.translation.label("translation"),
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
        .outerjoin(KeySkillTranslation, KeySkillTranslation.name == skills.c.name)
        .join(KeySkillImage, KeySkillImage.name == skills.c.name, isouter=True)
        .order_by(skills.c.place.asc())
    )

    if with_total_count:
        return result, skills_base
    return result
    # count = func.count().filter(
    #             Vacancy.created_at.between(current_from, current_to)
    #         ).label('count')

    # prev_count = func.count().filter(
    #             Vacancy.created_at.between(prev_from, prev_to)
    #         ).label('prev_count')

    # average_salary_case = case(
    #     (
    #         and_(
    #             VacancySalary.salary_from.is_not(None),
    #             VacancySalary.salary_to.is_not(None),
    #         ),
    #         (
    #             VacancySalary.salary_from / Currency.currency_rate
    #             + VacancySalary.salary_to / Currency.currency_rate
    #         )
    #         / 2,
    #     ),
    #     (
    #         and_(
    #             VacancySalary.salary_from.is_(None),
    #             VacancySalary.salary_to.is_not(None),
    #         ),
    #         VacancySalary.salary_to / Currency.currency_rate,
    #     ),
    #     (
    #         and_(
    #             VacancySalary.salary_from.is_not(None),
    #             VacancySalary.salary_to.is_(None),
    #         ),
    #         VacancySalary.salary_from / Currency.currency_rate,
    #     ),
    # )

    # skills_base = (
    #     select(
    #         KeySkill.name.label('name'),
    #         count,
    #         prev_count,
    #         func.row_number().over(
    #             order_by=desc(count)
    #         ).label('place'),
    #         func.row_number().over(
    #             order_by=desc(prev_count)
    #         ).label('prev_place'),
    #         func.percentile_cont(0.5)
    #             .within_group(average_salary_case).filter(
    #             Vacancy.created_at.between(current_from, current_to)
    #         ).label('average_salary')
    #     )
    #     .select_from(KeySkill)
    #     .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
    #     .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
    #     .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
    #     .group_by(KeySkill.name)
    # )

    # if experience is not None:
    #     skills_base = skills_base.where(Vacancy.experience == experience)

    # skills_base = skills_base.having(count >= 5)

    # skills = (
    #     select(*skills_base.c)
    #         .select_from(skills_base)
    #         .order_by(skills_base.c.place.asc())
    #         .offset(offset)
    #         .limit(limit)
    # )

    # def create_categories_subquery():
    #     json_object = func.json_build_object(
    #         "name", Category.name, "confidence", KeySkillCategory.confidence
    #     )
    #     categories_subquery = (
    #         select(
    #             KeySkillCategory.name,
    #             func.array_agg(
    #                 aggregate_order_by(json_object, KeySkillCategory.confidence.desc())
    #             ).label("categories"),
    #         )
    #         .select_from(skills_base)
    #         .join(KeySkillCategory, KeySkillCategory.name == skills_base.c.name)
    #         .join(Category, Category.id == KeySkillCategory.category_id)
    #         .group_by(KeySkillCategory.name)
    #     ).subquery()

    #     return categories_subquery

    # def create_technology_subquery():
    #     json_object = func.json_build_object(
    #         "name", Technology.name, "confidence", KeySkillTechnology.confidence
    #     )
    #     categories_subquery = (
    #         select(
    #             KeySkillTechnology.name,
    #             func.array_agg(
    #                 aggregate_order_by(json_object, KeySkillTechnology.confidence.desc())
    #             ).label("categories"),
    #         )
    #         .select_from(skills_base)
    #         .join(KeySkillTechnology, KeySkillTechnology.name == skills_base.c.name)
    #         .join(Technology, Technology.id == KeySkillTechnology.technology_id)
    #         .group_by(KeySkillTechnology.name)
    #     ).subquery()

    #     return categories_subquery

    # categories_subquery = create_categories_subquery()
    # technologies_subquery = create_technology_subquery()

    # result = (
    #     select(*skills.c, categories_subquery.c.categories.label("categories"), technologies_subquery.c.categories.label("technologies"), KeySkillImage.image, KeySkillTranslation.translation.label('translation'))
    #         .select_from(skills)
    #         .join(categories_subquery, categories_subquery.c.name == skills.c.name, isouter=True)
    #         .join(technologies_subquery, technologies_subquery.c.name == skills.c.name, isouter=True)
    #         .outerjoin(KeySkillTranslation, KeySkillTranslation.name == skills.c.name)
    #         .join(KeySkillImage, KeySkillImage.name == skills.c.name, isouter=True)
    #         .order_by(skills.c.place.asc())
    # )

    # return result


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


def create_technology_subquery():
    json_object = func.json_build_object(
        "name", Technology.name, "confidence", KeySkillTechnology.confidence
    )
    categories_subquery = (
        select(
            KeySkillTechnology.name,
            func.array_agg(
                aggregate_order_by(json_object, KeySkillTechnology.confidence.desc())
            ).label("categories"),
        )
        .select_from(KeySkillTechnology)
        .join(Technology, Technology.id == KeySkillTechnology.technology_id)
        .group_by(KeySkillTechnology.name)
    ).subquery()

    return categories_subquery


def skills_list(
    session: Session, days_period=30, limit=20, offset=0, experience=None, min_count=5
):
    skills, skills_base = get_base_skills(
        days_period=days_period,
        limit=limit,
        offset=offset,
        min_count=min_count,
        experience=experience,
        with_total_count=True,
    )

    current_to = func.now()
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)

    total_count = session.exec(
        select(func.count(func.distinct(skills_base.c.name))).select_from(skills_base)
    ).one()

    return {
        "skills": session.exec(skills).all(),
        "count_bins": 1,
        "salary_bins": 1,
        "max_salary": 1,
        "rows": total_count,
    }

    current_to = func.now()
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
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .group_by(KeySkill.name)
        .having(count >= 5)
    )

    skills = (
        select(*skills_base.c)
        .select_from(skills_base)
        .order_by(skills_base.c.place.asc())
        .offset(offset)
        .limit(limit)
    )

    def create_categories_subquery():
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
            .select_from(skills_base)
            .join(KeySkillCategory, KeySkillCategory.name == skills_base.c.name)
            .join(Category, Category.id == KeySkillCategory.category_id)
            .group_by(KeySkillCategory.name)
        ).subquery()

        return categories_subquery

    def create_technology_subquery():
        json_object = func.json_build_object(
            "name", Technology.name, "confidence", KeySkillTechnology.confidence
        )
        categories_subquery = (
            select(
                KeySkillTechnology.name,
                func.array_agg(
                    aggregate_order_by(
                        json_object, KeySkillTechnology.confidence.desc()
                    )
                ).label("categories"),
            )
            .select_from(skills_base)
            .join(KeySkillTechnology, KeySkillTechnology.name == skills_base.c.name)
            .join(Technology, Technology.id == KeySkillTechnology.technology_id)
            .group_by(KeySkillTechnology.name)
        ).subquery()

        return categories_subquery

    categories_subquery = create_categories_subquery()
    technologies_subquery = create_technology_subquery()

    result = (
        select(
            *skills.c,
            categories_subquery.c.categories.label("categories"),
            technologies_subquery.c.categories.label("technologies"),
            KeySkillImage.image,
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
        .order_by(skills.c.place.asc())
    )

    total_count = session.exec(
        select(func.count(func.distinct(skills_base.c.name))).select_from(skills_base)
    ).one()

    print("ROOOOOWS", total_count)

    return {
        "skills": session.exec(result).all(),
        "count_bins": 1,
        "salary_bins": 1,
        "max_salary": 1,
        "rows": total_count,
    }

    salary_calc = (
        select(
            VacancySalary.vacancy_id,
            case(
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
            ).label("normalized_salary"),
        )
        .join(Currency, Currency.currency_code == VacancySalary.currency)
        .cte("salary_calc")
    )

    final_query = (
        select(
            skills_base.c.name,
            skills_base.c.count,
            skills_base.c.prev_count,
            # func.row_number().over(
            #     order_by=desc(skills_base.c.count)
            # ).label('place'),
            # func.row_number().over(
            #     order_by=desc(skills_base.c.prev_count)
            # ).label('prev_place'),
            func.percentile_cont(0.5)
            .within_group(salary_calc.c.normalized_salary)
            .label("average_salary"),
        )
        .select_from(skills_base)
        .join(KeySkill, KeySkill.name == skills_base.c.name)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .join(VacancySalary, VacancySalary.vacancy_id == Vacancy.id, isouter=True)
        .join(
            salary_calc,
            salary_calc.c.vacancy_id == VacancySalary.vacancy_id,
            isouter=True,
        )
        .group_by(
            skills_base.c.name,
            skills_base.c.count,
            skills_base.c.prev_count,
        )
    )

    return session.exec(final_query).all()

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

    skills = (
        select(
            KeySkill.name,
            func.count()
            .filter(Vacancy.created_at.between(current_from, current_to))
            .label("count"),
            func.count()
            .filter(Vacancy.created_at.between(prev_from, prev_to))
            .label("prev_count"),
            func.percentile_cont(0.5)
            .within_group(average_salary_case)
            .filter(Vacancy.created_at.between(current_from, current_to))
            .label("average_salary"),
        )
        .select_from(KeySkill)
        .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
        .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
        .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
        .group_by(KeySkill.name)
    )

    skills_with_place = (
        select(
            skills.c.name,
            skills.c.count,
            skills.c.prev_count,
            func.row_number().over(order_by=desc(skills.c.count)).label("place"),
            func.row_number()
            .over(order_by=desc(skills.c.prev_count))
            .label("prev_place"),
            skills.c.average_salary,
        )
        .join(KeySkillImage, KeySkillImage.name == skills.c.name, isouter=True)
        .select_from(skills)
        .order_by(desc(skills.c.count))
        .limit(20)
    )

    return session.exec(skills_with_place).all()

    # total_count = session.exec(
    #     select(func.count(func.distinct(KeySkill.name)))
    #     .select_from(KeySkill)
    #     .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
    #     .where(Vacancy.created_at.between(current_from, current_to))
    # ).one()

    # skills = (
    #     select(
    #         KeySkill.name,
    #         func.count().filter(
    #             Vacancy.created_at.between(current_from, current_to)
    #         ).label('count'),
    #         func.count().filter(
    #             Vacancy.created_at.between(prev_from, prev_to)
    #         ).label('prev_count'),
    #         func.percentile_cont(0.5)
    #             .within_group(average_salary_case).filter(
    #             Vacancy.created_at.between(current_from, current_to)
    #         )
    #             .label("average_salary"),
    #     )
    #     .select_from(KeySkill)
    #     .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
    #     .outerjoin(VacancySalary, Vacancy.id == VacancySalary.vacancy_id)
    #     .outerjoin(Currency, Currency.currency_code == VacancySalary.currency)
    #     .group_by(KeySkill.name)
    #     .order_by(desc('count'))
    #     .offset(offset)
    #     .limit(limit)
    # ).cte("skills")

    # COUNT_BINS = 15
    # # count_chart = create_chart_subquery(
    # #     current_to - datetime.timedelta(days=days_period * 2), current_to, COUNT_BINS
    # # )

    # SALARY_BINS = 20
    # # salary_chart, max_salary = create_salary_subquery(
    # #     session, current_to - datetime.timedelta(days=days_period), current_to, SALARY_BINS
    # # )
    # categories_subquery = create_categories_subquery()
    # technologies_subquery = create_technology_subquery()

    # skills_with_place = (
    #     select(
    #         skills.c.name,
    #         skills.c.count,
    #         skills.c.prev_count,
    #         func.row_number().over(
    #             order_by=desc(skills.c.count)
    #         ).label('place'),
    #         func.row_number().over(
    #             order_by=desc(skills.c.prev_count)
    #         ).label('prev_place'),
    #         skills.c.average_salary,
    #         KeySkillImage.image,
    #         # count_chart.c.chart,
    #         categories_subquery.c.categories.label("categories"),
    #         technologies_subquery.c.categories.label("technologies"),
    #         # salary_chart.c.salary_chart,
    #     )
    #     .select_from(skills)
    #     .outerjoin(KeySkillImage, KeySkillImage.name == skills.c.name)
    #     # .outerjoin(count_chart, count_chart.c.name == skills.c.name)
    #     .outerjoin(
    #         categories_subquery,
    #         skills.c.name == categories_subquery.c.name,
    #     )
    #     .outerjoin(
    #         technologies_subquery,
    #         skills.c.name == technologies_subquery.c.name,
    #     )
    #     # .outerjoin(
    #     #     salary_chart,
    #     #     skills.c.name == salary_chart.c.name,
    #     # )
    #     .order_by(desc(skills.c.count))
    # )

    # return {
    #     'skills': session.exec(skills_with_place).all(),
    #     'count_bins': COUNT_BINS,
    #     'salary_bins': SALARY_BINS,
    #     'max_salary': 1,
    #     'rows': total_count
    # }

    # # def create_chart_subquery(date_from, date_to, number_of_bins):
    # #     right = extract("epoch", date_to)
    # #     left = extract("epoch", date_from)
    # #     bin_size = (right - left) / number_of_bins
    # #     vacancy_date = extract("epoch", cast(Vacancy.created_at, Date))
    # #     bin = func.ceil(((vacancy_date - left) / bin_size)).label("bin")

    # #     count_chart = (
    # #         select(
    # #             KeySkill.name,
    # #             bin,
    # #             func.count().label("count")
    # #         )
    # #         .join(Vacancy, Vacancy.id == KeySkill.vacancy_id)
    # #         .where((cast(Vacancy.created_at, Date) > date_from))
    # #         .group_by(KeySkill.name, "bin")
    # #         .subquery()
    # #     )
    # #     chart_agg = (
    # #         select(
    # #             count_chart.c.name,
    # #             func.json_agg(
    # #                 func.json_build_object("bin", count_chart.c.bin, "count", count_chart.c.count)
    # #             ).label("chart")
    # #         )
    # #         .group_by(count_chart.c.name)
    # #         .subquery()
    # #     )
    # #     return chart_agg

    # # def create_categories_subquery():
    # #     json_object = func.json_build_object(
    # #         "name", Category.name, "confidence", KeySkillCategory.confidence
    # #     )
    # #     categories_subquery = (
    # #         select(
    # #             KeySkillCategory.name,
    # #             func.array_agg(
    # #                 aggregate_order_by(json_object, KeySkillCategory.confidence.desc())
    # #             ).label("categories"),
    # #         )
    # #         .select_from(skills)
    # #         .join(KeySkillCategory, KeySkillCategory.name == skills.c.name)
    # #         .join(Category, Category.id == KeySkillCategory.category_id)
    # #         .group_by(KeySkillCategory.name)
    # #     ).subquery()

    # #     return categories_subquery

    # # def create_technology_subquery():
    # #     json_object = func.json_build_object(
    # #         "name", Technology.name, "confidence", KeySkillTechnology.confidence
    # #     )
    # #     categories_subquery = (
    # #         select(
    # #             KeySkillTechnology.name,
    # #             func.array_agg(
    # #                 aggregate_order_by(json_object, KeySkillTechnology.confidence.desc())
    # #             ).label("categories"),
    # #         )
    # #         .select_from(skills)
    # #         .join(KeySkillTechnology, KeySkillTechnology.name == skills.c.name)
    # #         .join(Technology, Technology.id == KeySkillTechnology.technology_id)
    # #         .group_by(KeySkillTechnology.name)
    # #     ).subquery()

    # #     return categories_subquery

    # # def create_salary_subquery(session, date_from, date_to, number_of_bins):
    # #     average_salary_case = case(
    # #         (
    # #             and_(
    # #                 VacancySalary.salary_from.is_not(None),
    # #                 VacancySalary.salary_to.is_not(None),
    # #             ),
    # #             (
    # #                 VacancySalary.salary_from / Currency.currency_rate
    # #                 + VacancySalary.salary_to / Currency.currency_rate
    # #             )
    # #             / 2,
    # #         ),
    # #         (
    # #             and_(
    # #                 VacancySalary.salary_from.is_(None),
    # #                 VacancySalary.salary_to.is_not(None),
    # #             ),
    # #             VacancySalary.salary_to / Currency.currency_rate,
    # #         ),
    # #         (
    # #             and_(
    # #                 VacancySalary.salary_from.is_not(None),
    # #                 VacancySalary.salary_to.is_(None),
    # #             ),
    # #             VacancySalary.salary_from / Currency.currency_rate,
    # #         ),
    # #     )

    # #     vacancies = (
    # #         select(
    # #             KeySkill.name.label("name"),
    # #             Vacancy.created_at,
    # #             average_salary_case.label("average_salary"),
    # #             Currency.currency_code,
    # #         )
    # #         .select_from(Vacancy)
    # #         .join(VacancySalary, VacancySalary.vacancy_id == Vacancy.id)
    # #         .join(KeySkill, Vacancy.id == KeySkill.vacancy_id)
    # #         .join(Currency, Currency.currency_code == VacancySalary.currency)
    # #         .where((cast(Vacancy.created_at, Date) > date_from))
    # #     )

    # #     avg_salary = session.exec(select(func.avg(vacancies.c.average_salary))).all()[0]

    # #     right = avg_salary * 5
    # #     left = 0

    # #     bin_size = (right - left) / number_of_bins
    # #     vacancy_average_salary = vacancies.c.average_salary.label("average_salary")
    # #     bin = func.ceil(((vacancy_average_salary - left) / bin_size)).label("bin")
    # #     bins = (
    # #         select(vacancies.c.name, bin, vacancy_average_salary)
    # #         .select_from(vacancies)
    # #         .where((cast(vacancies.c.created_at, Date) > date_from))
    # #         .where(bin >= 1)
    # #         .where(bin <= number_of_bins)
    # #         .order_by(vacancies.c.name.desc())
    # #     ).subquery()

    # #     average_salary_per_skill = (
    # #         select(
    # #             bins.c.name,
    # #             # sqlalchemy.func.median(bins.c.average_salary).label('average_salary')
    # #             func.percentile_cont(0.5)
    # #             .within_group(bins.c.average_salary)
    # #             .label("average_salary"),
    # #         )
    # #         .select_from(bins)
    # #         .group_by(bins.c.name)
    # #     ).subquery()

    # #     grouped_bins_count = func.count().label("count")
    # #     grouped_bins = (
    # #         select(bins.c.name, bins.c.bin, grouped_bins_count)
    # #         .group_by(bins.c.name, bins.c.bin)
    # #         .order_by(grouped_bins_count.desc())
    # #     ).subquery()

    # #     bin_label = grouped_bins.c.bin.label("bin")
    # #     json_object = func.json_build_object(
    # #         "bin", bin_label, "count", grouped_bins.c.count
    # #     )
    # #     salary_chart = (
    # #         select(
    # #             grouped_bins.c.name,
    # #             func.to_json(
    # #                 func.array_agg(aggregate_order_by(json_object, bin_label.asc()))
    # #             ).label("salary_chart"),
    # #         ).group_by(grouped_bins.c.name)
    # #     ).subquery()

    # #     salary_chart_with_avg = (
    # #         select(
    # #             salary_chart.c.name,
    # #             salary_chart.c.salary_chart,
    # #             average_salary_per_skill.c.average_salary,
    # #         ).join(
    # #             average_salary_per_skill,
    # #             average_salary_per_skill.c.name == salary_chart.c.name,
    # #         )
    # #     ).subquery()

    # #     return salary_chart_with_avg

    # # COUNT_BINS = 15
    # # count_chart = create_chart_subquery(
    # #     current_to - datetime.timedelta(days=days_period * 2), current_to, COUNT_BINS
    # # )

    # # SALARY_BINS = 20
    # # salary_chart = create_salary_subquery(
    # #     session, current_to - datetime.timedelta(days=days_period), current_to, SALARY_BINS
    # # )
    # # categories_subquery = create_categories_subquery()
    # # technologies_subquery = create_technology_subquery()

    # # skills_with_place = (
    # #     select(
    # #         skills.c.name,
    # #         skills.c.count,
    # #         skills.c.prev_count,
    # #         func.row_number().over(
    # #             order_by=desc(skills.c.count)
    # #         ).label('place'),
    # #         func.row_number().over(
    # #             order_by=desc(skills.c.prev_count)
    # #         ).label('prev_place'),
    # #         count_chart.c.chart,
    # #         KeySkillImage.image,
    # #         categories_subquery.c.categories.label("categories"),
    # #         technologies_subquery.c.categories.label("technologies"),
    # #         salary_chart.c.salary_chart,
    # #         salary_chart.c.average_salary
    # #     )
    # #     .select_from(skills)
    # #     .outerjoin(count_chart, count_chart.c.name == skills.c.name)
    # #     .outerjoin(KeySkillImage, skills.c.name == KeySkillImage.name)
    # #     .outerjoin(
    # #         categories_subquery,
    # #         skills.c.name == categories_subquery.c.name,
    # #     )
    # #     .outerjoin(
    # #         technologies_subquery,
    # #         skills.c.name == technologies_subquery.c.name,
    # #     )
    # #     .outerjoin(
    # #         salary_chart,
    # #         skills.c.name == salary_chart.c.name,
    # #     )
    # #     .order_by(desc(skills.c.count))
    # # )

    # # return {
    # #     'skills': session.exec(skills_with_place).all(),
    # #     'count_bins': COUNT_BINS,
    # #     'salary_bins': SALARY_BINS
    # # }
