from pypika import Table, MySQLQuery

from repositories.database_config import getCursor

users_table = Table('users')


def get_employees_by_id(employee_id):
    query = MySQLQuery.from_(users_table).select('*').where(users_table.id == employee_id)
    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchone()


def register_employee(employee_id, full_name, password):
    query = 'INSERT INTO users (id, full_name, password) VALUES (%s, %s, %s)'
    values = (employee_id, full_name, password)
    getCursor().execute(query, values)


def login(employee_id, password):
    query = MySQLQuery.from_(users_table).select('id', 'full_name', 'role') \
        .where(users_table.id == employee_id) \
        .where(users_table.password == password)
    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchone()
