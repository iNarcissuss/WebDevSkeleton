from serverApp.features.require_feature import RequiredFeature
from serverApp.application_context import register_dependencies
import serverApp.constants

def main():
    """ Runs the application """
    register_dependencies()
    app = RequiredFeature(serverApp.constants.features.FLASK_APP_FEATURE).request()
    route = RequiredFeature(serverApp.constants.features.ROUTE_FEATURE).request()
    route.register_routes()
    app.start_app()

if __name__ == "__main__":
    main()
