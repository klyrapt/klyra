from rest_framework import serializers
from .models import Sala
from escola.models import Instituicao

class SalaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sala
        fields = "__all__"
        read_only_fields = ["instituicao"]

    def validate(self, data):
        user = self.context["request"].user
        instituicao = Instituicao.objects.filter(admin=user).first()
        if not instituicao:
            raise serializers.ValidationError("Usuário não é administrador de nenhuma instituição.")
        return data

    def create(self, validated_data):
        user = self.context["request"].user
        instituicao = Instituicao.objects.filter(admin=user).first()
        if not instituicao:
            raise serializers.ValidationError("Instituição não encontrada para este usuário.")
        validated_data["instituicao"] = instituicao
        return super().create(validated_data)
