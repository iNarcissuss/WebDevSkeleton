from serverApp.features.require_feature import RequiredFeature
from serverApp.constants.features import REDIS_CONFIG_FEATURE
import redis

def get_cache():
    redis_config = RequiredFeature(REDIS_CONFIG_FEATURE).request()
    return redis.StrictRedis(
        host=redis_config.redis_host(),
        port=redis_config.redis_port(),
        db=redis_config.redis_database(),
        password=redis_config.redis_password())
