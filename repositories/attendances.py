from datetime import datetime

from pypika import Table, MySQLQuery
from pypika.functions import Date

from repositories.database_config import getCursor

attendances_table = Table('attendances')


def get_attendances_by_employee_id(employee_id):
    query = MySQLQuery.from_(attendances_table).select('*').where(attendances_table.user_id == employee_id)
    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchall()


def insert_attendance(employee_id):
    query = MySQLQuery.into(attendances_table).columns(attendances_table.user_id) \
        .insert(employee_id)
    cursor = getCursor()
    cursor.execute(str(query))


def check_today_attendance(employee_id):
    query = MySQLQuery.from_(attendances_table).select('*').where(
        attendances_table.user_id == employee_id).where(Date(attendances_table.created_at) == datetime.now().date())
    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchone()
