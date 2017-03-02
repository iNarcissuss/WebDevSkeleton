import redis
r = redis.StrictRedis(host='data-cache', port=6379, db=0, password="redis")
r.get('foo')
r.set('hello',"world")
print(r.get('hello'))