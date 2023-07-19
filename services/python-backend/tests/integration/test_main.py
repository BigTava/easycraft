def test_health_check(client):
    # Given
    # When
    response = client.get("/health-check")

    # Then
    assert response.status_code == 200
    assert response.json() == {"message": "OK"}
