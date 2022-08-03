
from pypika import Tables, MySQLQuery

from repositories.database_config import getCursor

paid_leaves_table, users_table = Tables('paid_leaves', 'users')


def get_paid_leaves_by_user_id(employee_id):
    query = MySQLQuery.from_(paid_leaves_table).select('*')\
        .join(users_table)\
        .on(paid_leaves_table.user_id == users_table.id)\
        .where(paid_leaves_table.user_id == employee_id)
    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchall()


def insert_paid_leaves(employee_id, reason, start_date, end_date):
    query = MySQLQuery.into(paid_leaves_table) \
        .columns(paid_leaves_table.user_id,
                 paid_leaves_table.reason,
                 paid_leaves_table.start_date,
                 paid_leaves_table.end_date) \
        .insert(employee_id, reason, start_date, end_date)

    cursor = getCursor()
    cursor.execute(str(query))


