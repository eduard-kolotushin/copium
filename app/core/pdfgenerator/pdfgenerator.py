import jinja2
import pdfkit
import pathlib

dir_path = pathlib.Path(__file__).parent


class PDFGenerator:
    def __init__(
            self,
            *,
            template_root=dir_path,
            template_path='./templates/template.html',
            output_path=dir_path / 'pdf/',
            css_path=dir_path / './style/template.css',
            wkhtmltopdf='C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe'
    ):
        self.template_root = template_root
        self.template_path = template_path
        self.output_path = output_path
        self.css_path = css_path
        self.wkhtmltopdf = wkhtmltopdf

    def generate_pdf(self, context):
        template_loader = jinja2.FileSystemLoader(self.template_root)
        template_env = jinja2.Environment(loader=template_loader)
        template = template_env.get_template(self.template_path)
        pdf_string = template.render(context)
        config = pdfkit.configuration(wkhtmltopdf=self.wkhtmltopdf)
        pdfkit.from_string(pdf_string, f'{self.output_path}/generated_{hash(pdf_string)}.pdf',
                           configuration=config, css=self.css_path)


if __name__ == '__main__':
    context = {
        "title": {
            "text": "Отчет о сделанных публикациях за год."
        },
        "list_of_val": list(range(30))
    }
    pdf_gen = PDFGenerator()
    pdf_gen.generate_pdf(context=context)
