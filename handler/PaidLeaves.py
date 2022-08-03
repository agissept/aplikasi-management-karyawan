from flask_restful import Resource, reqparse

from repositories.paid_leaves import get_paid_leaves_by_user_id, insert_paid_leaves
from utils.response_handler import response_success

parser = reqparse.RequestParser()
parser.add_argument('reason', required=True)
parser.add_argument('start_date', required=True)
parser.add_argument('end_date', required=True)


class EmployeePaidLeaves(Resource):
    def get(self, employee_id):
        paid_leaves = get_paid_leaves_by_user_id(employee_id)
        return response_success(paid_leaves, "paid_leaves")

    def post(self, employee_id):
        args = parser.parse_args()
        reason = args['reason']
        start_date = args['start_date']
        end_date = args['end_date']
        insert_paid_leaves(employee_id, reason, start_date, end_date)
        return response_success(message="data successfully added", response_code=201)
