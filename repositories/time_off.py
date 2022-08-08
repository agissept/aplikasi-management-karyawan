from pypika import Tables, MySQLQuery

from repositories.database_config import getCursor

paid_leaves_table, users_table = Tables('paid_leaves', 'users')


def get_time_off_by_user_id(employee_id, policy=None):
    query = MySQLQuery.from_(paid_leaves_table).select('*') \
        .join(users_table) \
        .on(paid_leaves_table.user_id == users_table.id) \
        .where(paid_leaves_table.user_id == employee_id)

    if policy is not None:
        query = query.where(paid_leaves_table.policy == policy)

    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchall()


def get_paid_leaves_by_user_id(employee_id):
    query = MySQLQuery.from_(paid_leaves_table).select('*') \
        .join(users_table) \
        .on(paid_leaves_table.user_id == users_table.id) \
        .where(paid_leaves_table.user_id == employee_id) \
        .where(paid_leaves_table.policy == 'Cuti')
    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchall()


def is_time_off_day_taken(employee_id, date):
    query = MySQLQuery.from_(paid_leaves_table).select('*') \
        .where(paid_leaves_table.user_id == employee_id) \
        .where(paid_leaves_table.date == date)
    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchone() is not None


def insert_time_off(employee_id, reason, date, policy):
    query = MySQLQuery.into(paid_leaves_table) \
        .columns(paid_leaves_table.user_id,
                 paid_leaves_table.reason,
                 paid_leaves_table.date,
                 paid_leaves_table.policy) \
        .insert(employee_id, reason, date, policy)

    cursor = getCursor()
    cursor.execute(str(query))
