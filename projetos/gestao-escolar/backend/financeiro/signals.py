"""
import pdfkit
import base64
import os
from datetime import datetime
import subprocess
from django.core.files.base import ContentFile
from django.core.mail import EmailMessage
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.conf import settings
from financeiro.models import Recibo, Preco
from matricula.models import Matricula
"""

"""
@receiver(post_save, sender=Matricula)
def gerar_comprovativo_matricula(sender, instance, created, **kwargs):
    if not created:
        return

    # Verifica se wkhtmltopdf está instalado
    try:
        subprocess.check_call(['wkhtmltopdf', '--version'])
    except (subprocess.CalledProcessError, OSError):
        raise Exception(
            'wkhtmltopdf não está instalado ou não está no PATH. '
            'Consulte: https://wkhtmltopdf.org/downloads.html'
        )

    # Obtém o caminho definido no settings.py
    wkhtmltopdf_path = getattr(settings, 'WKHTMLTOPDF_PATH', None)
    if not wkhtmltopdf_path or not os.path.exists(wkhtmltopdf_path):
        raise Exception('O caminho para o wkhtmltopdf não está corretamente definido em settings.py.')

    config = pdfkit.configuration(wkhtmltopdf=wkhtmltopdf_path)

    matricula = instance
    aluno = matricula.aluno
    instituicao = matricula.instituicao
    nivel = matricula.turma.nivel

    try:
        preco = Preco.objects.get(instituicao=instituicao, nivel=nivel, tipo="matricula")
        valor = preco.valor
    except Preco.DoesNotExist:
        valor = 0.00

    responsavel = aluno.responsavel.nome_completo if aluno.responsavel else aluno.pai_nome or "Não informado"
    contato = aluno.responsavel.telefone if aluno.responsavel and aluno.responsavel.telefone else ""
    email_resp = aluno.responsavel.usuario.email if aluno.responsavel and aluno.responsavel.usuario else ""

    # Código de verificação e número
    codigo = f"{matricula.ano_letivo}-{str(matricula.numero_matricula)[-5:]}-XYZW"
    numero_comprovativo = f"{datetime.now().year}/{str(matricula.numero_matricula).zfill(5)}"
    ano_letivo_int = int(matricula.ano_letivo)
    ano_letivo = f"{ano_letivo_int}/{ano_letivo_int + 1}"

    # Logo da instituição como base64
    logo_base64 = None
    if instituicao.logo and os.path.exists(instituicao.logo.path):
        with open(instituicao.logo.path, "rb") as image_file:
            encoded_logo = base64.b64encode(image_file.read()).decode('utf-8')
            ext = instituicao.logo.name.split('.')[-1]
            logo_base64 = f"data:image/{ext};base64,{encoded_logo}"

    # Contexto do template
    context = {
        "instituicao": instituicao,
        "aluno": aluno,
        "matricula": matricula,
        "valor": valor,
        "responsavel_nome": responsavel,
        "responsavel_email": email_resp,
        "responsavel_telefone": contato,
        "curso": matricula.turma.nivel.nome,
        "turma": matricula.turma.nome,
        "regime": "Diurno",
        "data_matricula": matricula.data_matricula.strftime("%d/%m/%Y"),
        "codigo_verificacao": codigo,
        "data_emissao": datetime.now().strftime("%d/%m/%Y às %H:%M"),
        "numero_comprovativo": numero_comprovativo,
        "ano_letivo": ano_letivo,
        "logo_base64": logo_base64,
    }

    # Renderiza HTML
    html = render_to_string("comprovativos/comprovativo_matricula.html", context)

    # Configurações do PDF
    options = {
        'enable-local-file-access': '',
        'encoding': "UTF-8",
        'quiet': '',
        'margin-top': '0mm',
        'margin-right': '0mm',
        'margin-bottom': '0mm',
        'margin-left': '0mm',
        'disable-smart-shrinking': '',
        'print-media-type': '',
        'dpi': 300,
        'viewport-size': '1280x1024',
    }

    # Geração do PDF
    pdf_bytes = pdfkit.from_string(html, False, configuration=config, options=options)

    # Cria o recibo
    recibo = Recibo.objects.create(
        matricula=matricula,
        aluno=aluno,
        instituicao=instituicao,
        tipo="matricula",
        titulo="Comprovativo de Matrícula",
        descricao=f"Comprovativo referente à matrícula do aluno {aluno.nome_completo}.",
        codigo_verificacao=codigo,
        valor=valor,
    )

    nome_arquivo = recibo.nome_arquivo()
    recibo.arquivo_pdf.save(nome_arquivo, ContentFile(pdf_bytes))

    # Envio de email para o aluno
    if aluno.email:
        email = EmailMessage(
            "Comprovativo de Matrícula - EduGestão",
            f"Olá {aluno.nome_completo},\n\nSegue em anexo o comprovativo da sua matrícula.",
            to=[aluno.email],
        )
        email.attach(nome_arquivo, pdf_bytes, "application/pdf")
        email.send(fail_silently=True)
        recibo.enviado_para_aluno = True

    # Envio para responsável
    if email_resp:
        email_resp_msg = EmailMessage(
            "Comprovativo de Matrícula do Aluno",
            f"Segue em anexo o comprovativo da matrícula de {aluno.nome_completo}.",
            to=[email_resp],
        )
        email_resp_msg.attach(nome_arquivo, pdf_bytes, "application/pdf")
        email_resp_msg.send(fail_silently=True)
        recibo.enviado_para_responsavel = True

    recibo.save()
"""