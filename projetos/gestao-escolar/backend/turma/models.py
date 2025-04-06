from django.db import models
from escola.models import Instituicao
from nivel.models import Nivel
from professor.models import Professor


class Turma(models.Model):
    nome = models.CharField(max_length=100)  # Ex: 10A
    ano_letivo = models.PositiveIntegerField()
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name="turmas")
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="turmas")
    capacidade = models.PositiveIntegerField(null=True, blank=True, help_text="Número máximo de alunos permitidos na turma")
    diretor_turma = models.ForeignKey(
    Professor,
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name="turmas_diretor",
    help_text="Professor responsável como diretor da turma"
)




    
    
    class Meta:
        unique_together = ("nome", "ano_letivo", "instituicao")  # ← isso garante unicidade
        ordering = ["ano_letivo", "nome"]

    def __str__(self):
        return f"{self.nome}"
