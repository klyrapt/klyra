from django.db import models
from core.models import User
from escola.models import Instituicao


class Professor(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={"tipo": "professor"})
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="professores")

    formacao = models.CharField(max_length=100, blank=True)
    especializacao = models.CharField(max_length=150, blank=True)
    biografia = models.TextField(blank=True, null=True)

    foto = models.ImageField(upload_to="professores/fotos", blank=True, null=True)

    telefone = models.CharField(max_length=20, blank=True)
    data_nascimento = models.DateField(null=True, blank=True)
    genero = models.CharField(
        max_length=10,
        choices=[('M', 'Masculino'), ('F', 'Feminino'), ('O', 'Outro')],
        blank=True
    )

    nacionalidade = models.CharField(max_length=100, blank=True)
    naturalidade = models.CharField(max_length=100, blank=True)

    endereco_completo = models.TextField(blank=True)
    bairro = models.CharField(max_length=100, blank=True)
    cidade = models.CharField(max_length=100, blank=True)
    codigo_postal = models.CharField(max_length=20, blank=True)

    data_admissao = models.DateField(null=True, blank=True)
    regime_trabalho = models.CharField(
        max_length=50,
        choices=[("integral", "Integral"), ("parcial", "Parcial"), ("horista", "Horista")],
        blank=True
    )

    ativo = models.BooleanField(default=True)

    def __str__(self):
        return self.usuario.get_full_name()
