import serverApp.constants.messages.errors

class RedisConfig(object):
    """Provides configuration for database."""

    def redis_host(self):
        """host for redis"""
        raise NotImplementedError()

    def redis_password(self):
        """password for redis"""
        raise NotImplementedError()

    def redis_port(self):
        """port for redis"""
        raise NotImplementedError()

    def redis_database(self):
        """database number for redis"""
        raise NotImplementedError()
