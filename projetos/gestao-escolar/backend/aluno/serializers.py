from rest_framework import serializers
from core.models import User
from responsavel.models import Responsavel
from aluno.models import Aluno
from matricula.models import NumeroAluno
from responsavel.serializers import ResponsavelSerializer
from django.utils.crypto import get_random_string

class NumeroAlunoSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumeroAluno
        fields = '__all__'


class AlunoSerializer(serializers.ModelSerializer):
    responsavel = ResponsavelSerializer(required=False)
    numero_aluno = serializers.SerializerMethodField()

    class Meta:
        model = Aluno
        fields = [
            'id',
            'nome_completo',
            'email',
            'telefone',
            'data_nascimento',
            'genero',
            'nacionalidade',
            'naturalidade',
            'documento_identidade',
            'numero_documento',
            'data_emissao_documento',
            'local_emissao_documento',
            'responsavel',
            'numero_aluno',
            'endereco_completo',
            'bairro',
            'cidade',
            'codigo_postal',
            'tem_alguma_deficiencia',
            'descricao_deficiencia',
            'alergias',
            'plano_saude',
            'situacao_escolar_anterior',
            'escola_anterior',
            'ano_concluido_anterior',
            'foto_perfil',
            'pai_nome',
            'mae_nome',
            'criado_em',
            'usuario',
            'instituicao'
        ]

    def get_numero_aluno(self, obj):
        # Busca a matrícula mais recente ou confirmada
        matricula = obj.matriculas.order_by("-data_matricula").first()
        if matricula and hasattr(matricula, "numero_aluno"):
            return matricula.numero_aluno.numero_aluno
        return None

    def create(self, validated_data):
        responsavel_data = validated_data.pop("responsavel", None)
        usuario = self.context["usuario"] if "usuario" in self.context else validated_data.pop("usuario", None)

        if responsavel_data:
            resp_user_data = responsavel_data.pop("usuario", None)
            if resp_user_data:
                user_resp = User.objects.create_user(
                    email=resp_user_data["email"],
                    tipo="responsavel",
                    password=get_random_string(length=8),
                    is_active=False
                )
                responsavel_data["usuario"] = user_resp
            responsavel = Responsavel.objects.create(**responsavel_data)
            validated_data["responsavel"] = responsavel

        aluno = Aluno.objects.create(usuario=usuario, **validated_data)
        return aluno
