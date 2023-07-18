import pytest
from app.main import app
from starlette.testclient import TestClient


@pytest.fixture
def client():
    return TestClient(app)


def test_health_check(client):
    """
    GIVEN
    WHEN health check endpoint is called with GET method
    THEN response with status 200 and body OK is returned
    """
    response = client.get("/health-check")
    assert response.status_code == 200
    assert response.json() == {"message": "OK"}
