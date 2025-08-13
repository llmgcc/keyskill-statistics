from sqlalchemy import and_, case, func, nullsfirst, nullslast

from src.models import VacancySalary, Currency


def average_salary_case():
    return case(
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


def get_order_by_clause(subquery, order_by_param, descending):
    if not order_by_param:
        return (subquery.c.place,)

    column_name = order_by_param

    if column_name == "change":
        change_expr = (
            (subquery.c.count - subquery.c.prev_count)
            / func.nullif(subquery.c.prev_count, 0)
            * 100
        )
        return (
            (nullslast(change_expr.desc()),)
            if descending
            else (nullslast(change_expr.asc()),)
        )

    if column_name == "new":
        return (
            nullslast(subquery.c.prev_count.asc()),
            nullslast(subquery.c.count.desc()),
        )

    if column_name == "unknown_salary":
        return (
            nullsfirst(subquery.c.average_salary.asc()),
            nullslast(subquery.c.count.desc()),
        )

    try:
        column = subquery.c[column_name]
        return (nullslast(column.desc()),) if descending else (nullslast(column),)
    except KeyError:
        return (subquery.c.place,)
