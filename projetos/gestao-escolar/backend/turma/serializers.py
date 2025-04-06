# turma/serializers.py

from rest_framework import serializers
from turma.models import Turma
from ensino.models import Ensino
from nivel.models import Nivel
from escola.models import Instituicao
from professor.models import Professor


class TurmaSerializer(serializers.ModelSerializer):
    nivel = serializers.PrimaryKeyRelatedField(queryset=Nivel.objects.all())
    instituicao = serializers.PrimaryKeyRelatedField(queryset=Instituicao.objects.all(), required=False)
    diretor_turma = serializers.PrimaryKeyRelatedField(queryset=Professor.objects.all(), required=False, allow_null=True)
    diretor_turma_nome = serializers.SerializerMethodField()
    professores_atribuidos = serializers.SerializerMethodField()

    class Meta:
        model = Turma
        fields = "__all__"
        read_only_fields = []

    def get_diretor_turma_nome(self, instance):
        if instance.diretor_turma and instance.diretor_turma.usuario:
            return instance.diretor_turma.usuario.nome
        return None

    def get_professores_atribuidos(self, instance):
        ensinos = Ensino.objects.filter(turma=instance)
        return [
            {
                "disciplina": str(ensino.disciplina),
                "professor": str(ensino.professor)
            } for ensino in ensinos
        ]

    def validate(self, attrs):
        user = self.context["request"].user
        instituicao = Instituicao.objects.filter(admin=user).first()

        if not instituicao:
            raise serializers.ValidationError("Usuário não é administrador de nenhuma instituição.")

        if hasattr(user, "instituicao"):
            nivel = attrs.get("nivel")
            if nivel and nivel.instituicao != user.instituicao:
                raise serializers.ValidationError({
                    "nivel": "Este nível não pertence à sua instituição."
                })

            diretor = attrs.get("diretor_turma")
            if diretor and diretor.instituicao != user.instituicao:
                raise serializers.ValidationError({
                    "diretor_turma": f"O professor {diretor.usuario.nome} não pertence à sua instituição."
                })

        return attrs

    def create(self, validated_data):
        user = self.context["request"].user
        try:
            instituicao = Instituicao.objects.get(admin=user)
        except Instituicao.DoesNotExist:
            raise serializers.ValidationError("Usuário não é administrador de nenhuma instituição.")

        validated_data["instituicao"] = instituicao
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user = self.context["request"].user
        try:
            instituicao = Instituicao.objects.get(admin=user)
        except Instituicao.DoesNotExist:
            raise serializers.ValidationError("Usuário não é administrador de nenhuma instituição.")

        if instance.instituicao != instituicao:
            raise serializers.ValidationError("Sem permissão para editar esta turma.")

        return super().update(instance, validated_data)
