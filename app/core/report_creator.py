from .pdfgenerator import PDFGenerator


def create_report(*, publications=None, pdf_creator=PDFGenerator()):
    is_iterable = True
    if publications is None:
        raise ValueError(f"Publications set must be provided, got {publications}")
    try:
        _ = iter(publications)
    except TypeError:
        is_iterable = False
    context = {
        "title": {
            "text": "Отчет о сделанных публикациях за год."
        },
        "publications": publications
    }
    filename = pdf_creator.generate_pdf(context=context)
    return filename
