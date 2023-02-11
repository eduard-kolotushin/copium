FROM python:3.10

WORKDIR /app

COPY . .

ENV SECRET_KEY=LIASUDBFO87F8QWEOF8D
ENV FLASK_ENV=testing
ENV SQLALCHEMY_DATABASE_URI=sqlite:///copium_db.db
ENV DB_DIALECT=sqlite
ENV DB_NAME=copium_db.db
ENV DB_USER=copium_user
ENV DB_PASSWORD=copium_password
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV SQLALCHEMY_TRACK_MODIFICATIONS=True

RUN pip install -f requirements.txt

ENTRYPOINT ["python"]
CMD ["run.py"]
