import jinja2
import pdfkit
from datetime import datetime

my_name = "Frank Andrade"
item1 = "TV"
item2 = "Couch"
item3 = "Washing Machine"
today_date = datetime.today().strftime("%d %b, %Y")

list_of_values = ["Line one",
                  "Line two",
                  "Line three",
                  "Line four",
                  "Line five",
                  "Line six"]

context = {'my_name': my_name, 'item1': item1, 'item2': item2, 'item3': item3,
           'today_date': today_date, 'list_of_val': list_of_values}

template_loader = jinja2.FileSystemLoader('./')
template_env = jinja2.Environment(loader=template_loader)

template = template_env.get_template('./templates/template.html')
output_text = template.render(context)

config = pdfkit.configuration(wkhtmltopdf='C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe')

if __name__ == '__main__':
    pdfkit.from_string(output_text, f'./pdf/generated_{hash(output_text)}.pdf',
                       configuration=config, css='./style/template.css')
