# turma/serializers.py

from rest_framework import serializers
from turma.models import Turma
from nivel.models import Nivel
from escola.models import Instituicao
from professor.models import Professor


class TurmaSerializer(serializers.ModelSerializer):
    nivel = serializers.PrimaryKeyRelatedField(queryset=Nivel.objects.all())
    instituicao = serializers.PrimaryKeyRelatedField(queryset=Instituicao.objects.all())
    professores = serializers.PrimaryKeyRelatedField(
        queryset=Professor.objects.all(), many=True, required=False
    )

    class Meta:
        model = Turma
        fields = "__all__"

        read_only_fields = ["instituicao"]
