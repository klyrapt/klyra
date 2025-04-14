from rest_framework import serializers
from .models import Matricula
from aluno.models import Aluno
from turma.models import Turma
from responsavel.models import Responsavel
from escola.models import Instituicao





class InstituicaoMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instituicao
        fields = "__all__"


# Serializers para leitura (GET)
class AlunoSimplesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aluno
        fields = ['nome_completo', 'email', 'data_nascimento', 'telefone']


class TurmaSimplesSerializer(serializers.ModelSerializer):
    nivel = serializers.StringRelatedField()

    class Meta:
        model = Turma
        fields = ['nome', 'nivel']


class ResponsavelSimplesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsavel
        fields = ['nome', 'email', 'telefone']


class MatriculaSerializer(serializers.ModelSerializer):
    aluno = AlunoSimplesSerializer(read_only=True)
    turma = TurmaSimplesSerializer(read_only=True)
    responsavel = ResponsavelSimplesSerializer(source="aluno.responsavel", read_only=True)
    instituicao = InstituicaoMiniSerializer(source='turma.instituicao', read_only=True)

    class Meta:
        model = Matricula
        fields = [
            'id',
            'aluno',
            'turma',
            'ano_letivo',
            'data_matricula',
            'status',
            'numero_matricula',
            'responsavel',
            'instituicao',
            'valor',
            'numero_aluno',
        ]


# Serializer para criação/edição (POST/PUT)
class MatriculaCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matricula
        fields = [
            'id',
            'aluno',
            'turma',
            'ano_letivo',
            'status',
            'valor',
        ]

    def validate(self, attrs):
        aluno = attrs.get("aluno")
        turma = attrs.get("turma")
        ano_letivo = attrs.get("ano_letivo")
        instituicao = self.context.get('instituicao') or attrs.get("instituicao")

        # Valida matrícula duplicada
        matricula_existente = Matricula.objects.filter(
            aluno=aluno,
            ano_letivo=ano_letivo,
            instituicao=instituicao
        )
        if self.instance:
            matricula_existente = matricula_existente.exclude(pk=self.instance.pk)

        if matricula_existente.exists():
            raise serializers.ValidationError("Este aluno já está matriculado neste ano letivo.")

        # Valida capacidade da turma
        if turma.capacidade:
            total_matriculados = Matricula.objects.filter(
                turma=turma,
                ano_letivo=ano_letivo,
                status__in=["confirmada", "pendente"]
            ).exclude(pk=self.instance.pk if self.instance else None).count()

            if total_matriculados >= turma.capacidade:
                raise serializers.ValidationError("A turma já atingiu a capacidade máxima de alunos.")

        return attrs

    def create(self, validated_data):
        return Matricula.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if instance.status == "cancelada" and validated_data.get("status") != "cancelada":
            raise serializers.ValidationError("Não é possível alterar o status de uma matrícula cancelada.")
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
