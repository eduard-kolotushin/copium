class TestRouteUser:
    def test_user_get(self, client):
        client.post('/api/login', json={
            "email": "ekolotushin@gmoil.cam",
            "password": "admin"
        }, follow_redirects=True)
        response = client.get('/api/user', follow_redirects=True)
        assert response.status_code == 200
