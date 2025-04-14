from django.db import models
from escola.models import Instituicao
from nivel.models import Nivel
from professor.models import Professor
from django.db.models import Max

from sala.models import Sala




class Turma(models.Model):
    nome = models.CharField(max_length=100)
    codigo = models.CharField(max_length=20, blank=True, null=True, help_text="Código interno da turma (ex: 12A-MAT2025)")

    
    turno = models.CharField(
        max_length=20,
        choices=[("manha", "Manhã"), ("tarde", "Tarde"), ("noite", "Noite")],
        default="manha",
        help_text="Turno em que a turma funciona"
    )

    sala = models.ForeignKey(Sala, on_delete=models.SET_NULL, null=True, blank=True, related_name="turmas")
    
    ano_letivo = models.PositiveIntegerField()
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name="turmas")
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="turmas")

    capacidade = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Número máximo de alunos permitidos na turma"
    )

    diretor_turma = models.ForeignKey(
        Professor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="turmas_diretor",
        help_text="Professor responsável como diretor da turma"
    )

    observacoes = models.TextField(null=True, blank=True, help_text="Informações adicionais sobre a turma")

    ativa = models.BooleanField(default=True, help_text="Indica se a turma está ativa no ano letivo")

    data_criacao = models.DateTimeField(auto_now_add=True)
    ultima_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("nome", "ano_letivo", "instituicao", "codigo")
        ordering = ["ano_letivo", "nome"]
  


    def tem_vagas(self, ano_letivo: str) -> bool:
        if self.capacidade is None:
            return True
        total = self.matriculas.filter(
            ano_letivo=ano_letivo,
            status__in=["confirmada", "pendente"]
        ).count()
        return total < self.capacidade
    

    def save(self, *args, **kwargs):
        if not self.codigo:
            # Buscar o maior código numérico já gerado para esta instituição + ano
            ultimo_codigo = Turma.objects.filter(
                instituicao=self.instituicao,
                ano_letivo=self.ano_letivo
            ).aggregate(maior=Max('codigo'))

            # Extrair número final do código anterior (se existir)
            try:
                 numero = int(ultimo_codigo["maior"][-3:]) + 1
            except (TypeError, ValueError, AttributeError):
                numero = 1


            self.codigo = f"TRM-{self.ano_letivo}{numero:03d}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nome} ({self.ano_letivo})"







