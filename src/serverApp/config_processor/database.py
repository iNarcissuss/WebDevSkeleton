import serverApp.constants.messages.errors

class DatabaseConfig(object):
    """Provides configuration for database."""

    def database_engine(self):
        """Type of engine for datastore."""
        raise NotImplementedError(serverApp.constants.messages.errors.MESSAGE_ERROR_NOT_IMPLEMENTED)

    def database_location(self):
        """Address of datastore."""
        raise NotImplementedError(serverApp.constants.messages.errors.MESSAGE_ERROR_NOT_IMPLEMENTED)

    def database_user(self):
        """User Name for Database"""
        raise NotImplementedError(serverApp.constants.messages.errors.MESSAGE_ERROR_NOT_IMPLEMENTED)

    def database_password(self):
        """Password for Database"""
        raise NotImplementedError(serverApp.constants.messages.errors.MESSAGE_ERROR_NOT_IMPLEMENTED)
