FROM python:3.10

RUN apt-get update

RUN apt-get install -y wkhtmltopdf

COPY . .

RUN mkdir "/app/core/pdfgenerator/pdf"

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["python"]
CMD ["run.py"]
