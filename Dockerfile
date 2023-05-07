FROM python:3.10

RUN apt update \
    && apt install -y wget \

RUN wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.jammy_amd64.deb

RUN apt install -f ./wkhtmltox_0.12.6.1-2.jammy_amd64.deb

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python"]
CMD ["run.py"]
