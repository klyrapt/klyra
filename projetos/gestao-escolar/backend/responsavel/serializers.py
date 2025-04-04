from rest_framework import serializers
from core.models import User
from responsavel.models import Responsavel
from core.serializers import UserSerializer



class ResponsavelSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(required=False)

    class Meta:
        model = Responsavel
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("usuario", None)
        if user_data:
            usuario = User.objects.create_user(
                email=user_data["email"],
                tipo="responsavel",
                password=User.objects.make_random_password(),
                is_active=False
            )
            validated_data["usuario"] = usuario
        return Responsavel.objects.create(**validated_data)


