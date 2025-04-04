from django.db import models
from core.models import User
from escola.models import Instituicao

class Responsavel(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={"tipo": "responsavel"})
    nome_completo = models.CharField(max_length=255)
    telefone = models.CharField(max_length=20, blank=True)
    parentesco = models.CharField(max_length=50, blank=True)  # Ex: Pai, Mãe, Tio, etc
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome_completo
