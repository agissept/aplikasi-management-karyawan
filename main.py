import os

import flask
from flask import Flask
from flask_restful import Api

from handler.TimeOffUpdate import TimeOffUpdate
from handler.TimeOff import TimeOff
from handler.Attendances import EmployeeAttendance
from handler.Auth import Auth
from handler.Employee import Employee
from handler.EmployeePaidLeaves import EmployeePaidLeaves
from handler.RegisterEmployee import RegisterEmployee
from handler.EmployeeTimeOff import EmployeeTimeOff
from handler.StorageDownloader import StorageDownloader
from handler.UserProfile import UserProfile

app = Flask(__name__, static_folder='public', static_url_path='/', template_folder='public')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
api = Api(app)

api.add_resource(RegisterEmployee, "/employee")
api.add_resource(Employee, "/employee/<int:employee_id>")
api.add_resource(EmployeePaidLeaves, "/employee/<int:employee_id>/paidleaves")
api.add_resource(EmployeeTimeOff, "/employee/<int:employee_id>/timeoff")
api.add_resource(TimeOff, "/timeoff")
api.add_resource(TimeOffUpdate, "/timeoff/<int:time_off_id>")
api.add_resource(Auth, "/login")
api.add_resource(EmployeeAttendance, "/employee/<int:employee_id>/attendances")
api.add_resource(StorageDownloader, "/storage/<string:filename>")
api.add_resource(UserProfile, "/userprofile/<int:user_id>")

@app.route("/")
def index():
    return flask.render_template('index.html')


if __name__ == "__main__":
    app.run(
        host=os.getenv('HOST'),
        port=os.getenv('PORT'),
        debug=os.getenv('DEBUG')
    )
