from flask_restful import Resource, reqparse

from repositories.time_off import update_time_off_status
from utils.response_handler import response_success

parser = reqparse.RequestParser()
parser.add_argument('status', required=True)


class TimeOffUpdate(Resource):
    def put(self, time_off_id):
        args = parser.parse_args()
        status = args['status']
        update_time_off_status(time_off_id, status)
        return response_success(message="Time off status updated", response_code=201)
