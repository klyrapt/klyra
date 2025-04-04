from django.db import models
from escola.models import Instituicao
from aluno.models import Aluno
from turma.models import Turma

class Matricula(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name="matriculas")
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE, related_name="matriculas")
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="matriculas")
    
    numero_matricula = models.CharField(max_length=20, unique=True, blank=True)
    data_matricula = models.DateField(auto_now_add=True)
    ano_letivo = models.CharField(max_length=10)

    ativo = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.numero_matricula:
            ano = self.data_matricula.year if self.data_matricula else 2025
            contador = Matricula.objects.count() + 1
            self.numero_matricula = f"{ano}{contador:04}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.aluno.nome_completo} - {self.turma.nome} ({self.ano_letivo})"
