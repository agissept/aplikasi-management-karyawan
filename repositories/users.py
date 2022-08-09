from pypika import Table, MySQLQuery

from repositories.database_config import getCursor

users_table = Table('users')


def get_user_by_id(employee_id):
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


def update_user_profile(user_id, full_name=None, gender=None, phone_number=None, birthdate=None, profile_picture=None,
                        new_password=None):
    query = MySQLQuery.update(users_table)
    if full_name is not None:
        query = query.set(users_table.full_name, full_name)

    if gender is not None:
        query = query.set(users_table.gender, gender)

    if phone_number is not None:
        query = query.set(users_table.phone, phone_number)

    if birthdate is not None:
        query = query.set(users_table.birthdate, birthdate)

    if profile_picture is not None:
        query = query.set(users_table.profile_picture, profile_picture)

    if new_password is not None:
        query = query.set(users_table.password, new_password)
    query.where(users_table.id == user_id)
    cursor = getCursor()
    cursor.execute(str(query))

