from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask_redis import FlaskRedis
import redis
r = redis.StrictRedis(host='data-cache', port=6379, db=0, password="redis")


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
api = Api(app)


REDIS_HOST = "data-cache"
REDIS_PASSWORD = "redis"
REDIS_PORT = 6379
REDIS_DATABASE = 0

redis_store = FlaskRedis(app)

class HelloWorld(Resource):
    def get(self):
        counter = r.get('counter')
        if(counter == None):
            counter = 0
        else:
            counter = int(counter)
        r.set('counter',counter+1)
        return { "hello": counter }

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(host="0.0.0.0")#without this it won't work
