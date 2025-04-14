# financeiro/models.py
from django.db import models
from matricula.models import Matricula
from escola.models import Instituicao
from aluno.models import Aluno
from nivel.models import Nivel

from uuid import uuid4



def get_unique_filename(instance, filename):
    return f"financeiro/recibos/{uuid4()}-{filename}"





TIPO_CHOICES = [
    ('matricula', 'Matrícula'),
    ('mensalidade', 'Mensalidade'),
    ('exame', 'Exame'),
    ('outro', 'Outro'),
    ]



class Preco(models.Model):
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="precos")
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name="precos")
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    valor = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    descricao = models.TextField(blank=True)

    class Meta:
        unique_together = ("instituicao", "nivel", "tipo")

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.nivel.nome} - {self.instituicao.nome}"




class Recibo(models.Model):
    matricula = models.ForeignKey(Matricula, on_delete=models.CASCADE, related_name='recibos')
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name="recibos")
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="recibos")
    titulo = models.CharField(max_length=100, default="Recibo de Matrícula")
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    descricao = models.TextField(blank=True)
    arquivo_pdf = models.FileField(upload_to=get_unique_filename)
    enviado_em = models.DateTimeField(auto_now_add=True)
    enviado_para_responsavel = models.BooleanField(default=False)
    enviado_para_aluno = models.BooleanField(default=False)
    codigo_verificacao = models.CharField(max_length=100, blank=True, null=True, default=None)

    valor = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)



    criado_em = models.DateTimeField(auto_now_add=True)



    class Meta:
        ordering = ['-criado_em']


    def __str__(self):
        return f"Recibo de {self.get_tipo_display()} - {self.matricula.aluno.nome_completo}"

    def nome_arquivo(self):
        return f"recibo-{self.tipo}-{self.matricula.numero_matricula}.pdf"
