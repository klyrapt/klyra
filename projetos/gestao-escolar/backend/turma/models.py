from django.db import models
from escola.models import Instituicao
from nivel.models import Nivel
from professor.models import Professor


class Turma(models.Model):
    nome = models.CharField(max_length=100)  # Ex: 10A
    ano_letivo = models.PositiveIntegerField()
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name="turmas")
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="turmas")
    professores = models.ManyToManyField(Professor, blank=True)

    def __str__(self):
        return f"{self.nome} - {self.ano_letivo}"
