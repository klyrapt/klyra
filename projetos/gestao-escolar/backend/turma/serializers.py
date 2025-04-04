from rest_framework import serializers
from .models import Turma


class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = ('id', 'nome', 'ano_letivo', 'nivel', 'instituicao', 'professores')

        read_only_fields = ["id", "instituicao"]