from django.db import models
from core.models import User
from escola.models import Instituicao

class Professor(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={"tipo": "professor"})
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="professores")
    formacao = models.CharField(max_length=100, blank=True)
    biografia = models.TextField(blank=True, null=True)
    foto = models.ImageField(upload_to="professores/fotos", blank=True, null=True)

    def __str__(self):
        return self.usuario.get_full_name()
