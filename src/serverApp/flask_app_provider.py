from flask import Flask
from flask_restful import Api
from flask_cors import CORS, cross_origin


class FlaskAppProvider(object):

    def __init__(self):
        self._app = self._get_flask_app()

    def _get_flask_app(self):
        """ Returns a Flask App """
        app = Flask(__name__)
        CORS(app, resources={r"/*": {"origins": "*"}})
        self._api = Api(app)
        return app

    def get_api(self):
        return self._api

    def start_app(self):
        """ Starts Flasks App """
        self._app.run(host="0.0.0.0")
