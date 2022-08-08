from datetime import datetime, timedelta

from flask_restful import Resource, reqparse
from flask import request

from repositories.time_off import insert_time_off, is_time_off_day_taken, get_paid_leaves_by_user_id, \
    get_time_off_by_user_id
from utils.response_handler import response_success, response_error

parser = reqparse.RequestParser()
parser.add_argument('reason', required=True)
parser.add_argument('start_date', required=True)
parser.add_argument('policy')
parser.add_argument('end_date', required=True)

MAX_PAID_LEAVES = 12


class EmployeeTimeOff(Resource):
    def post(self, employee_id):
        args = parser.parse_args()
        policy = args['policy']
        if policy not in ['Cuti', 'Sakit', 'Dinas', 'Lembur']:
            return response_error(message="Policy must be one of the following: Cuti, Sakit, Dinas, Lembur",
                                  response_code=400)
        reason = args['reason']

        start_date = datetime.strptime(args['start_date'], '%Y-%m-%d')
        end_date = datetime.strptime(args['end_date'], '%Y-%m-%d')

        if start_date.date() < datetime.now().date():
            return response_error(message="Start date must be in the future", response_code=400)

        if end_date.date() < start_date.date():
            return response_error(message="End date must be after start date", response_code=400)

        time_off_dates = [start_date + timedelta(days=x) for x in range((end_date - start_date).days + 1)]
        str_time_off_dates = [date.strftime('%Y-%m-%d') for date in time_off_dates]

        if policy == 'Cuti':
            taken_leaves = get_paid_leaves_by_user_id(employee_id)
            if (len(taken_leaves) + len(str_time_off_dates)) > MAX_PAID_LEAVES:
                return response_error(
                    message=f"You have exceeded the maximum number of paid leaves, your current paid_leaves is {MAX_PAID_LEAVES - len(taken_leaves)}",
                    response_code=400)

        for date in str_time_off_dates:
            if is_time_off_day_taken(employee_id, date):
                return response_error(message=f"Time off in {date} already taken", response_code=400)

        for date in str_time_off_dates:
            insert_time_off(employee_id, reason, date, args['policy'])

        return response_success(message="data successfully added", response_code=201)

    def get(self, employee_id):
        args = request.args
        policy = args.get('policy')
        if policy is not None and policy not in['Cuti', 'Sakit', 'Dinas', 'Lembur']:
            return response_error(message="Policy must be one of the following: Cuti, Sakit, Dinas, Lembur",
                                  response_code=400)

        date = args.get('date')


        time_off = get_time_off_by_user_id(employee_id, policy, date)
        return response_success(time_off, "time_off")
