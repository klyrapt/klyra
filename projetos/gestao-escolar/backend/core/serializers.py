from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    senha = serializers.CharField(write_only=True, source="password")
    confirmar_senha = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "senha",
            "confirmar_senha",
            "is_active",
            "is_staff",
            "date_joined",
        )
        extra_kwargs = {
            "is_active": {"read_only": True},
            "is_staff": {"read_only": True},
            "date_joined": {"read_only": True},
        }

    def validate_confirmar_senha(self, value):
        if self.initial_data.get("password") != value:
            raise serializers.ValidationError("As senhas não conferem")
        return value

    def create(self, validated_data):
        validated_data.pop("confirmar_senha", None)
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop("confirmar_senha", None)
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data["password"])
        return super().update(instance, validated_data)





class ConfirmarEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    codigo = serializers.CharField(max_length=6)

    def validate(self, data):
        email = data.get("email")
        codigo = data.get("codigo")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Usuário não encontrado.")

        if user.codigo_verificacao != codigo:
            raise serializers.ValidationError("Código incorreto.")

        data["user"] = user
        return data

    def save(self):
        user = self.validated_data["user"]
        user.is_active = True
        user.is_staff=True
        user.codigo_verificacao = None
        user.save()
        return user