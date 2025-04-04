from django.db import models
from django.utils.text import slugify

class Plano(models.Model):
    TIPO_CHOICES = (
        ('mensal', 'Mensal'),
        ('anual', 'Anual'),
    )

    nome = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    preco_anual = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    descricao = models.CharField(max_length=255)
    recursos = models.TextField(help_text="Separe cada recurso com ponto e vírgula ';'")
    destaque = models.BooleanField(default=False)
    personalizado = models.BooleanField(default=False)
    teste_gratis = models.BooleanField(default=False)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, default='mensal')

    moeda = models.CharField(max_length=10, default="EUR", help_text="Ex: EUR, BRL, USD")
    dias_teste = models.PositiveIntegerField(default=14, help_text="Duração do teste gratuito em dias")
    slug = models.SlugField(unique=True, blank=True)
    ordem = models.PositiveIntegerField(default=0, help_text="Ordem de exibição na página")

    class Meta:
        ordering = ["ordem"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nome)
        super().save(*args, **kwargs)

    def lista_recursos(self):
        return [item.strip() for item in self.recursos.split(';') if item.strip()]

    def __str__(self):
        return self.nome
