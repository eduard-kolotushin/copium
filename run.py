from app import create_app
import os


if __name__ == '__main__':
    app = create_app(os.getenv("FLASK_ENV", default="development"))
    app.run(host="0.0.0.0", port=5000)
