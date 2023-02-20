class TestRouteUser:
    def test_user_get(self, client):
        response = client.get('/api/user', follow_redirects=True)
        assert response.status_code == 200
