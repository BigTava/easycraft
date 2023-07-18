import pytest
from app.main import app
from starlette.testclient import TestClient


@pytest.fixture
def client():
    return TestClient(app)
