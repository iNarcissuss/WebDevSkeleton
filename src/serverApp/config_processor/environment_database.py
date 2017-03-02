
from os import environ
from serverApp.constants.environment import DATA_ENGINE, DATA_LOCATION, MYSQL_USER, MYSQL_PASSWORD
from serverApp.config_processor.database import DatabaseConfig

class EnvironmentDatabaseConfig(DatabaseConfig):
    """Provides configuration for database from Environment."""

    def database_engine(self):
        return environ[DATA_ENGINE].strip()

    def database_location(self):
        return environ[DATA_LOCATION].strip()

    def database_user(self):
        """User Name for Database"""
        return environ[MYSQL_USER].strip()

    def database_password(self):
        """Password for Database"""
        return  environ[MYSQL_PASSWORD].strip()
