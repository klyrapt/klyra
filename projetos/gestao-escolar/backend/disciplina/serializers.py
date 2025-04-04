# serializers.py
from rest_framework import serializers
from .models import Disciplina


class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = ['id', 'codigo', 'nome', 'descricao', 'carga_horaria', 'instituicao']
        read_only_fields = ['id', 'codigo', 'instituicao']





class DisciplinaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = ['id', 'nome', 'descricao', 'carga_horaria', 'codigo', 'instituicao']
        read_only_fields = ['id', 'codigo', 'instituicao']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['instituicao'] = user.instituicao_admin.first()
        return super().create(validated_data)