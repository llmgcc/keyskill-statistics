from sqlmodel import Session, and_, case, extract, select, func, cast, Date
from src.config import settings
from src.models import *
from sqlalchemy.dialects.postgresql import aggregate_order_by
import datetime
from src.common import average_salary_case


async def skills_chart(
    skill_name,
    session: Session,
    days_period=15,
    number_of_bins=20,
    for_all_skills=False,
    experience=None,
):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)

    right = extract("epoch", current_to)
    left = extract("epoch", prev_from)
    bin_size = (right - left) / number_of_bins
    vacancy_date = extract("epoch", cast(Vacancy.created_at, Date))
    bin = func.ceil(((vacancy_date - left) / bin_size)).label("bin")

    bins = (
        select(Vacancy.id, Vacancy.created_at, KeySkill.name, bin)
        .select_from(Vacancy)
        .join(KeySkill, Vacancy.id == KeySkill.vacancy_id)
        .where(
            and_(
                Vacancy.created_at.between(prev_from, current_to),
                Vacancy.created_at.between(settings.min_date, settings.max_date),
            )
        )
        .where(KeySkill.name == skill_name if not for_all_skills else True)
        .where(Vacancy.experience == experience if experience is not None else True)
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

    if for_all_skills:
        count_chart = select(
            grouped_bins.c.name,
            func.to_json(
                func.array_agg(aggregate_order_by(json_object, bin_label.asc()))
            ).label("chart"),
        ).group_by(grouped_bins.c.name)
        return count_chart.subquery()
    else:
        count_chart = select(
            func.to_json(
                func.array_agg(aggregate_order_by(json_object, bin_label.asc()))
            ).label("chart"),
        ).group_by(grouped_bins.c.name)
        return (await session.exec(count_chart)).first()


async def salary_chart(
    skill_name,
    session: Session,
    days_period=15,
    number_of_bins=15,
    experience=None,
    for_all_skills=False,
):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period)
    
    vacancies = (
        select(
            KeySkill.name.label("name"),
            Vacancy.created_at,
            average_salary_case().label("average_salary"),
            Currency.currency_code,
        )
        .select_from(Vacancy)
        .join(VacancySalary, VacancySalary.vacancy_id == Vacancy.id)
        .join(KeySkill, Vacancy.id == KeySkill.vacancy_id)
        .join(Currency, Currency.currency_code == VacancySalary.currency)
        .where(
            and_(
                Vacancy.created_at.between(current_from, current_to),
                Vacancy.created_at.between(settings.min_date, settings.max_date),
            )
        )
        .where(KeySkill.name == skill_name if not for_all_skills else True)
        .where(average_salary_case() <= settings.max_salary)
    )

    if experience is not None:
        vacancies = vacancies.where(Vacancy.experience == experience)

    right = settings.max_salary
    left = 0

    bin_size = (right - left) / number_of_bins
    vacancy_average_salary = vacancies.c.average_salary.label("average_salary")
    bin = func.ceil(((vacancy_average_salary - left) / bin_size)).label("bin")

    bins = (
        select(vacancies.c.name, bin, vacancy_average_salary)
        .select_from(vacancies)
        .where(bin >= 1)
        .where(bin <= number_of_bins)
        .order_by(vacancies.c.name.desc())
    ).subquery()

    average_salary_per_skill = (
        select(
            bins.c.name,
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

    salary_chart_with_avg = select(salary_chart.c.salary_chart).join(
        average_salary_per_skill,
        average_salary_per_skill.c.name == salary_chart.c.name,
    )

    if for_all_skills:
        salary_chart_with_avg = (
            select(salary_chart.c.name, salary_chart.c.salary_chart).join(
                average_salary_per_skill,
                average_salary_per_skill.c.name == salary_chart.c.name,
            )
        ).subquery()
        return salary_chart_with_avg, right
    else:
        return (await session.exec(salary_chart_with_avg)).first(), right


async def category_chart(
    category, session: Session, days_period=15, number_of_bins=20, experience=None
):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)

    right = extract("epoch", current_to)
    left = extract("epoch", prev_from)
    bin_size = (right - left) / number_of_bins
    vacancy_date = extract("epoch", cast(Vacancy.created_at, Date))
    bin = func.ceil(((vacancy_date - left) / bin_size)).label("bin")

    bins = (
        select(Vacancy.id, Vacancy.created_at, bin, Domain.name)
        .select_from(Vacancy)
        .join(KeySkill, Vacancy.id == KeySkill.vacancy_id)
        .join(KeySkillDomain, KeySkillDomain.name == KeySkill.name)
        .join(Domain, Domain.id == KeySkillDomain.domain_id)
        .where(
            and_(
                Vacancy.created_at.between(prev_from, current_to),
                Vacancy.created_at.between(settings.min_date, settings.max_date),
            )
        )
        .where(Domain.name == category)
        .where(Vacancy.experience == experience if experience is not None else True)
        .where(bin >= 1)
        .where(bin <= number_of_bins)
        .order_by(Vacancy.created_at.desc())
    )

    bins = bins.subquery()
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

    count_chart = select(
        func.to_json(
            func.array_agg(aggregate_order_by(json_object, bin_label.asc()))
        ).label("chart"),
    ).group_by(grouped_bins.c.name)

    return (await session.exec(count_chart)).first()


async def category_salary_chart(
    category,
    session: Session,
    days_period=15,
    number_of_bins=15,
    experience=None,
):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period)
    vacancies = (
        select(
            Domain.name.label("name"),
            Vacancy.created_at,
            average_salary_case().label("average_salary"),
            Currency.currency_code,
        )
        .select_from(Vacancy)
        .join(VacancySalary, VacancySalary.vacancy_id == Vacancy.id)
        .join(KeySkill, Vacancy.id == KeySkill.vacancy_id)
        .join(Currency, Currency.currency_code == VacancySalary.currency)
        .join(KeySkillDomain, KeySkillDomain.name == KeySkill.name)
        .join(Domain, Domain.id == KeySkillDomain.domain_id)
        .where(KeySkillDomain.confidence >= 0.25)
        .where(
            and_(
                Vacancy.created_at.between(current_from, current_to),
                Vacancy.created_at.between(settings.min_date, settings.max_date),
            )
        )
        .where(Domain.name == category)
    )

    if experience is not None:
        vacancies = vacancies.where(Vacancy.experience == experience)

    right = 10**6
    left = 0

    bin_size = (right - left) / number_of_bins
    vacancy_average_salary = vacancies.c.average_salary.label("average_salary")
    bin = func.ceil(((vacancy_average_salary - left) / bin_size)).label("bin")

    bins = (
        select(vacancies.c.name, bin, vacancy_average_salary)
        .select_from(vacancies)
        .where(bin >= 1)
        .where(bin <= number_of_bins)
        .order_by(vacancies.c.name.desc())
    ).subquery()

    average_salary_per_skill = (
        select(
            bins.c.name,
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

    salary_chart_with_avg = select(salary_chart.c.salary_chart).join(
        average_salary_per_skill,
        average_salary_per_skill.c.name == salary_chart.c.name,
    )

    return (await session.exec(salary_chart_with_avg)).first(), right


async def technologies_chart(
    technology, session: Session, days_period=15, number_of_bins=20, experience=None
):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period)
    prev_to = current_from
    prev_from = prev_to - datetime.timedelta(days=days_period)

    right = extract("epoch", current_to)
    left = extract("epoch", prev_from)
    bin_size = (right - left) / number_of_bins
    vacancy_date = extract("epoch", cast(Vacancy.created_at, Date))
    bin = func.ceil(((vacancy_date - left) / bin_size)).label("bin")

    bins = (
        select(Vacancy.id, Vacancy.created_at, bin, Category.name)
        .select_from(Vacancy)
        .join(KeySkill, Vacancy.id == KeySkill.vacancy_id)
        .join(KeySkillCategory, KeySkillCategory.name == KeySkill.name)
        .join(Category, Category.id == KeySkillCategory.category_id)
        .where(
            and_(
                Vacancy.created_at.between(prev_from, current_to),
                Vacancy.created_at.between(settings.min_date, settings.max_date),
            )
        )
        .where(Category.name == technology)
        .where(KeySkillCategory.confidence >= 0.25)
        .where(Vacancy.experience == experience if experience is not None else True)
        .where(bin >= 1)
        .where(bin <= number_of_bins)
        .order_by(Vacancy.created_at.desc())
    )

    bins = bins.subquery()
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

    count_chart = select(
        func.to_json(
            func.array_agg(aggregate_order_by(json_object, bin_label.asc()))
        ).label("chart"),
    ).group_by(grouped_bins.c.name)

    return (await session.exec(count_chart)).first()


async def technologies_salary_chart(
    technology,
    session: Session,
    days_period=15,
    number_of_bins=15,
    experience=None,
):
    current_to = settings.max_date
    current_from = current_to - datetime.timedelta(days=days_period)

    vacancies = (
        select(
            Category.name.label("name"),
            Vacancy.created_at,
            average_salary_case().label("average_salary"),
            Currency.currency_code,
        )
        .select_from(Vacancy)
        .join(VacancySalary, VacancySalary.vacancy_id == Vacancy.id)
        .join(KeySkill, Vacancy.id == KeySkill.vacancy_id)
        .join(Currency, Currency.currency_code == VacancySalary.currency)
        .join(KeySkillCategory, KeySkillCategory.name == KeySkill.name)
        .join(Category, Category.id == KeySkillCategory.category_id)
        .where(KeySkillCategory.confidence >= 0.25)
        .where(
            and_(
                Vacancy.created_at.between(current_from, current_to),
                Vacancy.created_at.between(settings.min_date, settings.max_date),
            )
        )
        .where(Category.name == technology)
    )

    if experience is not None:
        vacancies = vacancies.where(Vacancy.experience == experience)

    right = 10**6
    left = 0

    bin_size = (right - left) / number_of_bins
    vacancy_average_salary = vacancies.c.average_salary.label("average_salary")
    bin = func.ceil(((vacancy_average_salary - left) / bin_size)).label("bin")

    bins = (
        select(vacancies.c.name, bin, vacancy_average_salary)
        .select_from(vacancies)
        .where(bin >= 1)
        .where(bin <= number_of_bins)
        .order_by(vacancies.c.name.desc())
    ).subquery()

    average_salary_per_skill = (
        select(
            bins.c.name,
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

    salary_chart_with_avg = select(salary_chart.c.salary_chart).join(
        average_salary_per_skill,
        average_salary_per_skill.c.name == salary_chart.c.name,
    )

    return (await session.exec(salary_chart_with_avg)).first(), right
