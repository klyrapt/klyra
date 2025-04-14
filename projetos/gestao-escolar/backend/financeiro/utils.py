# financeiro/utils.py
import pdfkit
from django.template.loader import render_to_string
from django.conf import settings
import os

def gerar_pdf_recibo(contexto, nome_arquivo='recibo.pdf', salvar_em=None):
    html_string = render_to_string("recibo_matricula.html", contexto)

    path_wkhtmltopdf = os.path.join("C:/Program Files/wkhtmltopdf/bin", "wkhtmltopdf.exe")
    config = pdfkit.configuration(wkhtmltopdf=path_wkhtmltopdf)

    if not salvar_em:
        salvar_em = os.path.join(settings.MEDIA_ROOT, "recibos", nome_arquivo)

    options = {
        'enable-local-file-access': '',  # necessário para funcionar no Windows
        'encoding': "UTF-8",
    }

    pdfkit.from_string(html_string, salvar_em, configuration=config, options=options)
    return salvar_em
