from datetime import datetime, timedelta

from flask_restful import Resource, reqparse

from repositories.paid_leaves import get_paid_leaves_by_user_id, insert_paid_leaves, is_paid_leave_taken
from utils.response_handler import response_success, response_error

parser = reqparse.RequestParser()
parser.add_argument('reason', required=True)
parser.add_argument('start_date', required=True)
parser.add_argument('end_date', required=True)

MAX_PAID_LEAVES = 12

class EmployeePaidLeaves(Resource):
    def get(self, employee_id):
        paid_leaves = get_paid_leaves_by_user_id(employee_id)
        return response_success(paid_leaves, "paid_leaves")

    def post(self, employee_id):
        args = parser.parse_args()
        reason = args['reason']

        start_date = datetime.strptime(args['start_date'], '%Y-%m-%d')
        end_date = datetime.strptime(args['end_date'], '%Y-%m-%d')

        taken_leaves = get_paid_leaves_by_user_id(employee_id)
        if start_date.date() < datetime.now().date():
            return response_error(message="Start date must be in the future", response_code=400)

        if end_date.date() < start_date.date():
            return response_error(message="End date must be after start date", response_code=400)

        paid_leaves_dates = [start_date + timedelta(days=x) for x in range((end_date - start_date).days + 1)]
        str_paid_leaves_dates = [date.strftime('%Y-%m-%d') for date in paid_leaves_dates]

        if (len(taken_leaves) + len(str_paid_leaves_dates)) > MAX_PAID_LEAVES:
            return response_error(
                message=f"You have exceeded the maximum number of paid leaves, your current paid_leaves is {MAX_PAID_LEAVES - len(taken_leaves)}",
                response_code=400)

        for date in str_paid_leaves_dates:
            if is_paid_leave_taken(employee_id, date):
                return response_error(message=f"Paid leave in {date} already taken", response_code=400)

        for date in str_paid_leaves_dates:
            insert_paid_leaves(employee_id, reason, date)

        return response_success(message="data successfully added", response_code=201)
