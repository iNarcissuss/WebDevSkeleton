from serverApp.features import RequiredFeature
from serverApp.models import Base
from serverApp.constants.features import DATABASE_CONFIG_FEATURE 
from sqlalchemy import *
from sqlalchemy.orm import relation, sessionmaker

class RepoProvider(object):
    """ Wrapper for intializing DataStore"""

    def __init__(self):
        self._config = RequiredFeature(DATABASE_CONFIG_FEATURE).request()

    def _connection_provider(self, db_engine, db_location, user, password):
        """ returns a connection string for sql alchemy"""

        connection_string = '%s://%s:%s@%s' % (
            db_engine, user, password, db_location)
        return connection_string

    def _engine_provider(self):
        """ returns a sql alchemy engine"""
        engine = create_engine(
            self._connection_provider(
                self._config.database_engine(),
                self._config.database_location(),
                self._config.database_user(),
                self._config.database_password()
                ))
        #engine.execute("CREATE DATABASE IF NOT EXISTS WebDevSkeleton") #create db
        engine.execute("USE WebDevSkeleton") # select new db
        Base.metadata.create_all(engine)
        return engine

    def get_initialized_session(self):
        return sessionmaker(bind=self._engine_provider(),
                                    autoflush=False)()
