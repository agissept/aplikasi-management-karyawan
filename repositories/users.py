from pypika import Table, MySQLQuery

from repositories.database_config import getCursor

users_table = Table('users')


def get_user_by_id(employee_id):
    query = MySQLQuery.from_(users_table).select('*').where(users_table.id == employee_id)
    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchone()


def register_employee(employee_id, full_name, password, gender=None, phone_number=None, birthdate=None):
    query = MySQLQuery.into(users_table) \
        .columns(users_table.id, users_table.full_name, users_table.password, users_table.role, users_table.gender,
                 users_table.phone, users_table.birthdate) \
        .insert(employee_id, full_name, password, 'employee', gender, phone_number, birthdate)
    cursor = getCursor()
    cursor.execute(str(query))


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

    query = query.where(users_table.id == user_id)

    cursor = getCursor()
    cursor.execute(str(query))


def get_all_employees():
    query = MySQLQuery.from_(users_table).select('*').where(users_table.role == 'employee')
    cursor = getCursor()
    cursor.execute(str(query))
    return cursor.fetchall()


def delete_user(employee_id):
    query = MySQLQuery.from_(users_table).delete().where(users_table.id == employee_id)
    cursor = getCursor()
    cursor.execute(str(query))
