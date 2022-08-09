import os

from flask import request
from flask_restful import reqparse, Resource
from werkzeug.utils import secure_filename

from repositories.users import get_user_by_id, update_user_profile, login
from utils.response_handler import response_success

parser = reqparse.RequestParser()
parser.add_argument('full_name')
parser.add_argument('gender')
parser.add_argument('phone_number')
parser.add_argument('birthdate')
parser.add_argument('new_password')
parser.add_argument('old_password')


class UserProfile(Resource):
    def get(self, user_id):
        return response_success(get_user_by_id(user_id), 'user')

    def put(self, user_id):
        args = parser.parse_args()
        full_name = args['full_name']
        gender = args['gender']
        phone_number = args['phone_number']
        birthdate = args['birthdate']
        new_password = args['new_password']
        old_password = args['old_password']

        if (new_password is not None):
            a = login(user_id, old_password)

        filename = None
        if 'profile_picture' in request.files:
            file = request.files['profile_picture']
            if file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join('./Storage', filename))

        update_user_profile(user_id, full_name, gender, phone_number, birthdate, profile_picture=filename,
                            new_password=new_password)

        return response_success(response_code=201, message="User profile updated")
