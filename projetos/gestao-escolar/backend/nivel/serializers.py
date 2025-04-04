from .models import Nivel, GradeCurricular
from rest_framework import serializers
#from disciplina.serializers import DisciplinaSerializer
#from disciplina.models import Disciplina




class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nivel
        fields = ['id', 'nome', 'descricao', 'instituicao']
        read_only_fields = ['id', "instituicao"]


class GradeCurricularSerializer(serializers.ModelSerializer):
    nivel_nome = serializers.CharField(source="nivel.nome", read_only=True)
    disciplina_nome = serializers.CharField(source="disciplina.nome", read_only=True)

    class Meta:
        model = GradeCurricular
        fields = ["id", "nivel", "nivel_nome", "disciplina", "disciplina_nome", "carga_horaria"]
        read_only_fields = ['id']
