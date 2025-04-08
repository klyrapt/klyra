from django.db import models
from escola.models import Instituicao
from core.models import User
from responsavel.models import Responsavel




class Aluno(models.Model):
    numero_aluno = models.CharField(max_length=20, unique=True, blank=True)
    nome_completo = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    data_nascimento = models.DateField(null=True, blank=True)
    genero = models.CharField(max_length=20, choices=[('M', 'Masculino'), ('F', 'Feminino'), ('O', 'Outro')], blank=True)
    nacionalidade = models.CharField(max_length=100, blank=True)
    naturalidade = models.CharField(max_length=100, blank=True)

    documento_identidade = models.CharField(max_length=50, blank=True)
    numero_documento = models.CharField(max_length=50, blank=True)
    data_emissao_documento = models.DateField(null=True, blank=True)
    local_emissao_documento = models.CharField(max_length=100, blank=True)

    endereco_completo = models.TextField(blank=True)
    bairro = models.CharField(max_length=100, blank=True)
    cidade = models.CharField(max_length=100, blank=True)
    codigo_postal = models.CharField(max_length=20, blank=True)

    tem_alguma_deficiencia = models.BooleanField(default=False)
    descricao_deficiencia = models.TextField(blank=True)
    alergias = models.TextField(blank=True)
    plano_saude = models.CharField(max_length=100, blank=True)

    situacao_escolar_anterior = models.CharField(max_length=255, blank=True)
    escola_anterior = models.CharField(max_length=255, blank=True)
    ano_concluido_anterior = models.CharField(max_length=10, blank=True)

    foto_perfil = models.ImageField(upload_to='alunos/foto_perfil/', blank=True, null=True)
    pai_nome = models.CharField(max_length=255, blank=True)
    mae_nome = models.CharField(max_length=255, blank=True)

    usuario = models.OneToOneField(User, on_delete=models.CASCADE, limit_choices_to={"tipo": "aluno"}, null=True, blank=True)
    responsavel = models.ForeignKey(Responsavel, on_delete=models.SET_NULL, null=True, blank=True, related_name="alunos")

    instituicao = models.ForeignKey(Instituicao, on_delete=models.CASCADE, related_name="alunos")
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome_completo

    def save(self, *args, **kwargs):
        if not self.numero_aluno:
            ano = self.criado_em.year if self.criado_em else 2025
            contador = Aluno.objects.count() + 1
            self.numero_aluno = f"AL{ano}{contador:03}"
        super().save(*args, **kwargs)
