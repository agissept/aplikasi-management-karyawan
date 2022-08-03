from flask_restful import Resource, reqparse

from repositories import users
from utils.response_handler import response_error, response_success

parser = reqparse.RequestParser()
parser.add_argument('id', type=int, required=True)
parser.add_argument('password', required=True)


class Auth(Resource):
    def post(self):
        args = parser.parse_args()
        user_id = args['id']
        password = args['password']
        user = users.login(user_id, password)
        if user is None:
            return response_error("Username or password invalid", 400)
        return response_success(user, 'user')
