# disciplina/serializers.py

from rest_framework import serializers
from .models import Disciplina
from ensino.models import Ensino


class DisciplinaSerializer(serializers.ModelSerializer):
    professores_atribuidos = serializers.SerializerMethodField()

    class Meta:
        model = Disciplina
        fields = ['id', 'codigo', 'nome', 'descricao', 'carga_horaria', 'instituicao', 'professores_atribuidos']
        read_only_fields = ['id', 'codigo', 'instituicao']

    def get_professores_atribuidos(self, obj):
        ensinos = Ensino.objects.filter(disciplina=obj)
        return [
            {
                "professor": str(ensino.professor),
                "turma": str(ensino.turma)
            } for ensino in ensinos
        ]





class DisciplinaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = ['id', 'nome', 'descricao', 'carga_horaria', 'codigo', 'instituicao']
        read_only_fields = ['id', 'codigo', 'instituicao']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['instituicao'] = user.instituicao_admin.first()
        return Disciplina.objects.create(**validated_data)
