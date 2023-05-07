from pdfgenerator import PDFGenerator
import os

pdfgen = PDFGenerator(
    template_root='../../pdfgenerator/',
    output_path='../../pdfgenerator/pdf/'
)

if __name__ == '__main__':
    context = {
        "title": {
            "text": "Отчет о сделанных публикациях."
        },
        "list_of_val": list(range(20))
    }
    pdfgen.generate_pdf(context=context)
