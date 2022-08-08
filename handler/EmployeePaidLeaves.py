from flask_restful import Resource

from repositories.time_off import get_paid_leaves_by_user_id
from utils.response_handler import response_success


class EmployeePaidLeaves(Resource):
    def get(self, employee_id):
        paid_leaves = get_paid_leaves_by_user_id(employee_id)
        return response_success(paid_leaves, "paid_leaves")
