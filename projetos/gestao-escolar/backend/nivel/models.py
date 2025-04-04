from django.db import models
from escola.models import Instituicao
from disciplina.models import Disciplina



class Nivel(models.Model):
    nome = models.CharField(max_length=100)  # Ex: "10ª Classe", "12ª Classe"
    descricao = models.TextField(blank=True)
    instituicao = models.ForeignKey(
        Instituicao,
        on_delete=models.CASCADE,
        related_name="niveis"
    )

    def __str__(self):
        return f"{self.nome} ({self.instituicao.nome})"




class GradeCurricular(models.Model):
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name="grades")
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE, related_name="disciplinas")
    carga_horaria = models.PositiveIntegerField(help_text="Carga horária semanal (em horas)")

    def __str__(self):
        return f"{self.nivel.nome} - {self.disciplina.nome}"
