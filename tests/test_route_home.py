class TestRouteHome:
    def test_home(self, client):
        response = client.get('/api/home')
        assert response.status_code == 200
