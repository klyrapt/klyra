from django.db import models
from escola.models import Instituicao
from aluno.models import Aluno
from turma.models import Turma
from django.core.exceptions import ValidationError


from django.db.models import Max
from django.utils import timezone



STATUS_CHOICES = (
    ("pendente", "Pendente"),
    ("confirmada", "Confirmada"),
    ("cancelada", "Cancelada"),
)

def gerar_numero_matricula(instituicao, ano):
    prefixo = f"MAT{ano}"
    ultimo = Matricula.objects.filter(
        instituicao=instituicao,
        numero_matricula__startswith=prefixo
    ).aggregate(maior=Max('numero_matricula'))['maior']

    if ultimo:
        try:
            ultimo_num = int(ultimo[-4:])
        except ValueError:
            ultimo_num = 0
        novo_num = ultimo_num + 1
    else:
        novo_num = 1

    return f"{prefixo}{str(novo_num).zfill(4)}"


class Matricula(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name="matriculas")
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE, related_name="matriculas")
    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="matriculas")

    numero_matricula = models.CharField(max_length=20, blank=True)
    data_matricula = models.DateField(auto_now_add=True)
    ano_letivo = models.CharField(max_length=10)
    valor = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)


    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default="pendente")

    class Meta:
        unique_together = ('aluno', 'instituicao', 'ano_letivo')

    def save(self, *args, **kwargs):
        # Verificar se a turma pode receber mais alunos
        if self.status in ["confirmada", "pendente"]:
            total_matriculados = Matricula.objects.filter(
                turma=self.turma,
                ano_letivo=self.ano_letivo,
                status__in=["confirmada", "pendente"]
            ).exclude(pk=self.pk).count()

            if self.turma.capacidade is not None and total_matriculados >= self.turma.capacidade:
                raise ValidationError("A turma atingiu sua capacidade máxima de alunos.")

        # Gerar número de matrícula
        if not self.numero_matricula:
            ano = self.data_matricula.year if self.data_matricula else timezone.now().year
            tentativa = 0
            while True:
                tentativa += 1
                numero = gerar_numero_matricula(self.instituicao, ano)
                if not Matricula.objects.filter(numero_matricula=numero, instituicao=self.instituicao).exists():
                    self.numero_matricula = numero
                    break
                elif tentativa > 10:
                    raise ValidationError("Falha ao gerar número de matrícula único após múltiplas tentativas.")

        super().save(*args, **kwargs)


    def confirmar(self):
        if self.status == "cancelada":
            raise ValidationError("Não é possível confirmar uma matrícula cancelada.")
        self.status = "confirmada"
        self.save()

    def cancelar(self):
        if self.status == "cancelada":
            raise ValidationError("Matrícula já está cancelada.")
        self.status = "cancelada"
        self.save()

    def esta_ativa(self):
        return self.status == "confirmada"

    def __str__(self):
        return f"{self.aluno} - {self.numero_matricula} ({self.status})"





class NumeroAluno(models.Model):
    matricula = models.OneToOneField(Matricula, on_delete=models.CASCADE, related_name="numero_aluno")
    numero_aluno = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        if not self.numero_aluno:
            turma = self.matricula.turma
            ano_letivo = self.matricula.ano_letivo
            instituicao = self.matricula.instituicao

            # Pega todos os números usados nessa turma/ano/instituição
            usados = set(
                NumeroAluno.objects.filter(
                    matricula__turma=turma,
                    matricula__ano_letivo=ano_letivo,
                    matricula__instituicao=instituicao
                ).values_list("numero_aluno", flat=True)
            )

            # Ordena os alunos para definir a numeração de forma sequencial
            alunos_ordenados = Matricula.objects.filter(
                turma=turma,
                ano_letivo=ano_letivo,
                instituicao=instituicao,
                status__in=["confirmada", "pendente"]

            ).order_by("aluno__nome_completo")

            for idx, mat in enumerate(alunos_ordenados, start=1):
                if str(idx) not in usados:
                    self.numero_aluno = str(idx)
                    break
            else:
                self.numero_aluno = str(len(usados) + 1)

        # Validação manual: garante que esse número não exista na mesma turma/ano/instituição
        exists = NumeroAluno.objects.filter(
            numero_aluno=self.numero_aluno,
            matricula__turma=self.matricula.turma,
            matricula__ano_letivo=self.matricula.ano_letivo,
            matricula__instituicao=self.matricula.instituicao
        ).exclude(pk=self.pk).exists()

        if exists:
            raise ValidationError("Já existe um aluno com este número nessa turma, ano e instituição.")

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.numero_aluno}"
