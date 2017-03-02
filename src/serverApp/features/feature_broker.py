# Adapted from:
# code.activestate.com/recipes/413268-dependency-injection-the-python-way/
# under PSF


class FeatureBroker(object):
    """ Poor man's dependency injector """

    def __init__(self, allowOverride):
        self._providers = {}
        self._allowOverride = allowOverride

    def provide(self, feature, provider, *args, **kwargs):
        if not self._allowOverride:
            assert feature not in self._providers,\
                "Duplicate feature %r" % feature
        if callable(provider):
            def call(): return provider(*args, **kwargs)
        else:
            def call(): return provider
        self._providers[feature] = call

    def __getitem__(self, feature):

        try:
            provider = self._providers[feature]
        except KeyError:
            raise KeyError("Unknown feature named %r" % feature)
        return provider()

features = FeatureBroker(allowOverride=True)


def NoAssertion(obj): return True


def IsInstanceOf(*classes):
    def test(obj): return isinstance(obj, classes)
    return test


def HasAttributes(*attributes):
    def test(obj):
        for each in attributes:
            if not hasattr(obj, each):
                return False
        return True
    return test


def HasMethods(*methods):
    def test(obj):
        for each in methods:
            try:
                attr = getattr(obj, each)
            except AttributeError:
                return False
            if not callable(attr):
                return False
        return True
    return test
