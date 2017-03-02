from serverApp.features import RequiredFeature
from serverApp.constants.features import FLASK_APP_FEATURE
from serverApp.viewmodel import HelloWorld

class Router(object):
    """ Provides routing for web addresses """

    def __init__(self):
        self._api = RequiredFeature(FLASK_APP_FEATURE).request().get_api()

    def register_routes(self):
        """ Registers View Models on Routes """
        self._api.add_resource(HelloWorld, '/')
