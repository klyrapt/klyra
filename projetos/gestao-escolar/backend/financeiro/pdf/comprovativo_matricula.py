import pdfkit
from django.template.loader import render_to_string
from django.conf import settings

def gerar_pdf_comprovativo(contexto):
    html = render_to_string("financeiro/comprovativo_matricula.html", contexto)
    config = pdfkit.configuration(wkhtmltopdf=settings.WKHTMLTOPDF_PATH)


    pdf = pdfkit.from_string(html, False, configuration=config, options={
        'enable-local-file-access': None
    })

    return pdf
