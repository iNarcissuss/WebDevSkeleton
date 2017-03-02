import serverApp.constants.messages.errors


class QueueConfig(object):
    """ Access to Message Queue configuration from Environment """


    def MessageQueueUrl(self):
        """ Url for connecting to message queue """
        raise NotImplementedError(serverApp.constants.messages.errors.MESSAGE_ERROR_NOT_IMPLEMENTED)

    def MessageQueueUser(self):
        """ User for message queue """
        raise NotImplementedError(serverApp.constants.messages.errors.MESSAGE_ERROR_NOT_IMPLEMENTED)

    def MessageQueuePass(self):
        """ Password for message queue """
        raise NotImplementedError(serverApp.constants.messages.errors.MESSAGE_ERROR_NOT_IMPLEMENTED)
