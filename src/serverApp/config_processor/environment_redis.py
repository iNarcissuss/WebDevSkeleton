from os import environ
import serverApp.constants.messages.errors

class EnvironmentRedisConfig(object):
    """Provides configuration for database."""

    def redis_host(self):
        """host for redis"""
        return environ[serverApp.constants.environment.REDIS_HOST_FEATURE].strip()

    def redis_password(self):
        """password for redis"""
        return environ[serverApp.constants.environment.REDIS_PASSWORD_FEATURE].strip()

    def redis_port(self):
        """port for redis"""
        return environ[serverApp.constants.environment.REDIS_PORT_FEATURE]

    def redis_database(self):
        """database number for redis"""
        return environ[serverApp.constants.environment.REDIS_DATABASE_FEATURE]
