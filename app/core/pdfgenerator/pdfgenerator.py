import jinja2
import pdfkit
import pathlib
import platform

dir_path = pathlib.Path(__file__).parent
current_os = platform.system()
wkhtmltopdf_path = "C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe"
if current_os == "Linux":
    wkhtmltopdf_path = "/usr/bin/wkhtmltopdf"


class PDFGenerator:
    def __init__(
            self,
            *,
            template_root=dir_path,
            template_path='./templates/template.html',
            output_path=dir_path / 'pdf/',
            css_path=dir_path / './style/template.css',
            wkhtmltopdf=wkhtmltopdf_path
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
        filename = f'{self.output_path}/generated_{hash(pdf_string)}.pdf'
        pdfkit.from_string(pdf_string, filename, configuration=config, css=self.css_path)
        return filename


if __name__ == '__main__':
    context = {
        "title": {
            "text": "Отчет о сделанных публикациях за год."
        },
        "list_of_val": list(range(30))
    }
    pdf_gen = PDFGenerator()
    pdf_gen.generate_pdf(context=context)
