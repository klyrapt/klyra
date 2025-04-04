from django.db import models



class Sala(models.Model):
    nome = models.CharField(max_length=100)
    capacidade = models.PositiveIntegerField(null=True, blank=True)
    descricao = models.TextField(blank=True)
    bloco = models.CharField(max_length=100, blank=True)
    instituicao = models.ForeignKey("escola.Instituicao", on_delete=models.CASCADE, related_name="salas")

    def __str__(self):
        return self.nome
