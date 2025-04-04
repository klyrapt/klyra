# planos/serializers.py

from rest_framework import serializers
from .models import Plano

class PlanoSerializer(serializers.ModelSerializer):
    recursos_formatados = serializers.SerializerMethodField()

    class Meta:
        model = Plano
        fields = [
            "id",
            "nome",  # Corrigido aqui
            "preco",
            "preco_anual",
            "descricao",
            "recursos_formatados",  # retorna recursos como lista
            "destaque",
            "personalizado",
            "teste_gratis",
            "tipo",
            "moeda",
            "dias_teste",
            "slug",
        ]

    def get_recursos_formatados(self, obj):
        return obj.lista_recursos()


    
