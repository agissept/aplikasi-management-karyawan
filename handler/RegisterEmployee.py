from flask_restful import Resource, reqparse

from repositories import users
from repositories.users import get_user_by_id
from utils.response_handler import response_error, response_success

parser = reqparse.RequestParser()
parser.add_argument('id', type=int, required=True)
parser.add_argument('full_name', required=True)
parser.add_argument('password', required=True)
parser.add_argument('gender')
parser.add_argument('phone_number')
parser.add_argument('birthdate')


class RegisterEmployee(Resource):
    def post(self):
        args = parser.parse_args()
        employee_id = args['id']
        name = args['full_name']
        password = args['password']
        gender = args['gender']
        phone_number = args['phone_number']
        birthdate = args['birthdate']
        if get_user_by_id(employee_id) is not None:
            return response_error(message="Employee already exists", response_code=400)

        users.register_employee(employee_id, name, password, gender, phone_number, birthdate)
        return response_success(message="Employee successfully registered", response_code=201)

    def get(self):
        employees = users.get_all_employees()
        return response_success(employees, 'employees')
