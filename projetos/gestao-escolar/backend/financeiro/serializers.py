from rest_framework import serializers
from .models import Recibo
from .models import Preco




class ReciboSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recibo
        fields = "__all__"







class PrecoSerializer(serializers.ModelSerializer):
    nivel_nome = serializers.SerializerMethodField()

    class Meta:
        model = Preco
        fields = ['id', 'tipo', 'valor', 'descricao', 'nivel', 'nivel_nome']
        read_only_fields = ['instituicao']


    def get_nivel_nome(self, obj):
        return obj.nivel.nome