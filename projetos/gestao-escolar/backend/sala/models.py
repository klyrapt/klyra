from django.db import models





class Sala(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    descricao = models.TextField(blank=True, null=True)
    capacidade = models.PositiveIntegerField(null=True, blank=True)
    localizacao = models.CharField(max_length=100, blank=True, null=True)
    tipo = models.CharField(
        max_length=50,
        choices=[
            ("normal", "Sala Normal"),
            ("laboratorio", "Laboratório"),
            ("auditorio", "Auditório"),
        ],
        default="normal",
    )
    instituicao = models.ForeignKey("escola.Instituicao", on_delete=models.CASCADE, related_name="salas")

    def __str__(self):
        return self.nome

