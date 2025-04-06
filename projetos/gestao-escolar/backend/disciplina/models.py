# models.py

import uuid
from django.db import models
from escola.models import Instituicao


class Disciplina(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    carga_horaria = models.PositiveIntegerField(help_text="Carga horária em horas")
    codigo = models.CharField(max_length=20, unique=True, blank=True)
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="disciplinas")

    def save(self, *args, **kwargs):
        if not self.codigo:
            prefixo = self.nome[:3].upper()
            uuid_suffix = str(uuid.uuid4())[:6].upper()
            self.codigo = f"{prefixo}-{uuid_suffix}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nome

    class Meta:
        unique_together = ('nome', 'instituicao')

