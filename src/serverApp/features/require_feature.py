"""

    Adapted from:
    code.activestate.com/recipes/413268-dependency-injection-the-python-way/
    under PSF

"""

import serverApp.constants.messages.errors as er
from .feature_broker import *

class RequiredFeature(object):
    """ Poor man's dependency injector """

    def __init__(self, feature, assertion=NoAssertion):
        self.feature = feature
        self.assertion = assertion

    def __get__(self, obj, T):
        """ requests the feature on the first call"""
        return self.result

    def __getattr__(self, name):
        assert name == 'result',\
            er.FEATURE_REQUEST_OTHER_FAILURE
        self.result = self.request()
        return self.result

    def request(self):
        obj = features[self.feature]
        assert self.assertion(obj), \
            er.FEATURE_REQUEST_FAILURE_CRITERIA_FORMAT \
            % (obj, self.feature)
        return obj
