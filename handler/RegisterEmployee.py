from flask_restful import Resource, reqparse

from repositories import users
from repositories.users import get_employees_by_id
from utils.response_handler import response_error

parser = reqparse.RequestParser()
parser.add_argument('id', type=int, required=True)
parser.add_argument('full_name', required=True)
parser.add_argument('password', required=True)


class RegisterEmployee(Resource):
    def post(self):
        args = parser.parse_args()
        employee_id = args['id']
        name = args['full_name']
        password = args['password']
        if get_employees_by_id(employee_id) is not None:
            return response_error(message="Employee already exists", response_code=400)

        users.register_employee(employee_id, name, password)
        return {
            "success": True
        }
