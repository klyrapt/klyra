from django.db import models
from professor.models import Professor
from disciplina.models import Disciplina
from turma.models import Turma







class Ensino(models.Model):
    professor = models.ForeignKey(Professor, on_delete=models.CASCADE, related_name="ensinos")
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE, related_name="ensinos")
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE, related_name="ensinos")

    class Meta:
        unique_together = ('professor', 'disciplina', 'turma')
        verbose_name = "Atribuição de Ensino"
        verbose_name_plural = "Atribuições de Ensino"

    def __str__(self):
        return f"{self.professor} - {self.disciplina} ({self.turma})"
