from serverApp.features.require_feature import RequiredFeature
from serverApp.constants.features import CACHE_FEATURE
from flask_restful import Resource

class HelloWorld(Resource):
    def __init__(self):
        self._kvstore = RequiredFeature(CACHE_FEATURE).request()

    def get(self):
        try:
            counter = self._kvstore.get('counter')
            if counter is None:
                counter = 0
            else:
                counter = int(counter)
        except:
            counter = 0
        self._kvstore.set('counter', counter+1)
        return {
            "data": {
                "name": "server message",
                "counter": counter
            },
            "errors": [],
            "warnings": []
        }
