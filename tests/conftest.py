import pytest
from server import create_app


@pytest.fixture(scope='module')
def app(request):
    flask_app = create_app()

    print(flask_app.root_path)

    with flask_app.app_context():
        yield flask_app


@pytest.fixture(scope='module')
def client(request, app):
    test_client = app.test_client()
    return test_client
