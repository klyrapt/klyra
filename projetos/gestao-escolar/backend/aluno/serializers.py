from rest_framework import serializers
from core.models import User
from responsavel.models import Responsavel
from aluno.models import Aluno
from core.serializers import UserSerializer
from responsavel.serializers import ResponsavelSerializer






class AlunoSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(required=False)
    responsavel = ResponsavelSerializer(required=False)

    class Meta:
        model = Aluno
        fields = "__all__"

    def create(self, validated_data):
        user_data = validated_data.pop("usuario", None)
        responsavel_data = validated_data.pop("responsavel", None)

        if user_data:
            user = User.objects.create_user(
                email=user_data["email"],
                tipo="aluno",
                password=User.objects.make_random_password(),
                is_active=False
            )
            validated_data["usuario"] = user

        if responsavel_data:
            resp_user_data = responsavel_data.pop("usuario", None)
            if resp_user_data:
                user_resp = User.objects.create_user(
                    email=resp_user_data["email"],
                    tipo="responsavel",
                    password=User.objects.make_random_password(),
                    is_active=False
                )
                responsavel_data["usuario"] = user_resp
            responsavel = Responsavel.objects.create(**responsavel_data)
            validated_data["responsavel"] = responsavel

        return Aluno.objects.create(**validated_data)