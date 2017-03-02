from serverApp.config_processor import EnvironmentDatabaseConfig
from serverApp.config_processor import EnvironmentRedisConfig
from serverApp.features import features
import serverApp.constants.features as fe
from serverApp.data.repo_provider import RepoProvider
from serverApp.flask_app_provider import FlaskAppProvider
from serverApp.router import Router
from serverApp.cache import get_cache

def register_dependencies():
    """ Provides Features for Application """

    features.provide(fe.DATABASE_CONFIG_FEATURE, EnvironmentDatabaseConfig())
    features.provide(fe.SESSION_FEATURE, RepoProvider().get_initialized_session())
    features.provide(fe.REDIS_CONFIG_FEATURE, EnvironmentRedisConfig())
    features.provide(fe.CACHE_FEATURE, get_cache())
    features.provide(fe.FLASK_APP_FEATURE, FlaskAppProvider())
    features.provide(fe.ROUTE_FEATURE, Router())
