class TestConfig:
    def test_config(self, app):
        assert app.config.get("FLASK_ENV") is not None
        assert app.config.get("FLASK_ENV") == "testing"
