from django.db import models
from django.conf import settings

from datetime import timedelta
from django.utils import timezone

from planos.models import Plano

class Instituicao(models.Model):
    nome = models.CharField(max_length=255)
    endereco = models.TextField(blank=True)
    email = models.EmailField(blank=True)
    telefone = models.CharField(max_length=20, blank=True)
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    plano = models.ForeignKey(Plano, on_delete=models.SET_NULL, null=True)
    inicio_teste = models.DateField(null=True, blank=True)

    admin = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="instituicao_admin",
        help_text="Usuário administrador responsável por esta instituição."
    )
    criada_em = models.DateTimeField(auto_now_add=True)



    def esta_em_teste(self):
        if self.inicio_teste:
            return timezone.now().date() <= self.inicio_teste + timedelta(days=14)
        return False

    def __str__(self):
        return self.nome





