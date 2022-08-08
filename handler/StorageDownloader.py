import flask
from flask_restful import Resource


class StorageDownloader(Resource):
    def get(self, filename):
        return flask.send_from_directory('Storage', filename)