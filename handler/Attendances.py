from datetime import timezone
from pytz import timezone

from flask_restful import Resource

from repositories.attendances import get_attendances_by_employee_id, insert_attendance, check_today_attendance
from utils.response_handler import response_success, response_error


class EmployeeAttendance(Resource):
    def get(self, employee_id):
        attendances = get_attendances_by_employee_id(employee_id)
        attendances = map(lambda attendance: {
            "id": attendance['id'],
            "user_id": attendance['user_id'],
            "created_at": utc_to_local(attendance['created_at'])
        }, attendances)
        return response_success(list(attendances), 'attendances')

    def post(self, employee_id):
        if check_today_attendance(employee_id) is None:
            insert_attendance(employee_id)
            return response_success(message='data successfully added', response_code=201)
        else:
            return response_error("You have already checked in", 400)


def utc_to_local(utc_dt):
    return utc_dt.astimezone(timezone('Asia/Jakarta'))
