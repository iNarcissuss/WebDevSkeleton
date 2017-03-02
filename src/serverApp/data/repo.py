from serverApp.sqlalchemy import event
from serverApp.model.widget import Widget
from serverApp.features import RequiredFeature
from serverApp.features import IsInstanceOf
from serverApp.features import HasMethods
from serverApp.constants import *


class Repo(object):

    def __init__(self):
        self.engine = RequiredFeature(ENGINE_FEATURE).request()
        self.session = RequiredFeature(SESSION_FEATURE).request()

    def createWidget(self, widgetName):
        result = Widget(str(widgetName))
        self.session.add(result)
        self.session.commit()
        return result
