import json

from flask_restful import Resource, reqparse

from repositories import users

parser = reqparse.RequestParser()
parser.add_argument('id', type=int, required=True)
parser.add_argument('full_name', required=True)
parser.add_argument('password', required=True)


class Employee(Resource):

    def get(self):
        return

    def get(self, employee_id):
        employee = users.get_employees_by_id(employee_id)
        return json.loads(json.dumps(employee,  default=str))




    def post(self):
        args = parser.parse_args()
        employee_id = args['id']
        name = args['full_name']
        password = args['password']
        users.register_employee(employee_id, name, password)
        return {
            "success": True
        }
