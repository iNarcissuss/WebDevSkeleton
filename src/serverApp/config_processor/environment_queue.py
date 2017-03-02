from os import environ
import serverApp.constants.features
from serverApp.config_processor.queue import QueueConfig

class EnvironmentQueueConfig(QueueConfig):
    """ Access to Message Queue configuration from Environment """

    def message_queue_url(self):
        """ Url for connecting to message queue """
        return environ[serverApp.constants.features.MESSAGE_QUEUE_SERVER_FEATURE].strip()

    def message_queue_user(self):
        """ User for message queue """
        return environ[serverApp.constants.features.MESSAGE_QUEUE_USER_FEATURE].strip()

    def message_queue_pass(self):
        """ Password for message queue """
        return environ[serverApp.constants.features.MESSAGE_QUEUE_PASSWORD_FEATURE].strip()
