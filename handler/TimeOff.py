from flask_restful import Resource, reqparse

from repositories.time_off import get_all_time_off
from utils.response_handler import response_success

parser = reqparse.RequestParser()
parser.add_argument('reason', required=True)
parser.add_argument('start_date', required=True)
parser.add_argument('policy')
parser.add_argument('end_date', required=True)

MAX_PAID_LEAVES = 12


class TimeOff(Resource):
    def get(self):

        time_off = get_all_time_off()
        return response_success(time_off, "time_off")
