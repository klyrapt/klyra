from rest_framework import serializers

from core.models import User
from .models import Instituicao
from django.core.mail import send_mail
import random

from django.conf import settings

def gerar_codigo_verificacao():
    return str(random.randint(100000, 999999))




class InstituicaoSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(required=True, max_length=255)
    email = serializers.EmailField(required=False)
    telefone = serializers.CharField(required=False, max_length=20)
    logo = serializers.ImageField(required=False, allow_null=True)
    endereco = serializers.CharField(required=False)
    admin = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Instituicao
        fields = [
            "id",
            "nome",
            "email",
            "telefone",
            "endereco",
            "logo",
            "admin",
            "criada_em",
        ]
        read_only_fields = ["id", "criada_em", "admin"]



class InstituicaoCreateSerializer(serializers.ModelSerializer):
    nome_admin = serializers.CharField(write_only=True)
    email_admin = serializers.EmailField(write_only=True)
    senha_admin = serializers.CharField(write_only=True, min_length=6)
    confirmar_senha = serializers.CharField(write_only=True)


    class Meta:
        model = Instituicao
        fields = [
            "id",
            "nome",
            "email",
            "telefone",
            "endereco",
            "logo",
            "nome_admin",
            "email_admin",
            "senha_admin",
            "confirmar_senha",
            "criada_em",
        ]
        read_only_fields = ["id", "criada_em"]

    def validate(self, data):
        if data["senha_admin"] != data["confirmar_senha"]:
            raise serializers.ValidationError("As senhas não conferem")
        return data

    def create(self, validated_data):
        nome_admin = validated_data.pop("nome_admin")
        email_admin = validated_data.pop("email_admin")
        senha_admin = validated_data.pop("senha_admin")
        validated_data.pop("confirmar_senha")

        codigo = gerar_codigo_verificacao()

        user = User.objects.create_user(
            nome = nome_admin,
            email=email_admin,
            password=senha_admin,
            is_active=False,
            codigo_verificacao=codigo
        )
        self.enviar_email_confirmacao(user.email, codigo, user.nome)


        #self.enviar_email_confirmacao(user.nome, user.email, codigo)

        instituicao = Instituicao.objects.create(admin=user, **validated_data)
        return instituicao

    def enviar_email_confirmacao(self, email, codigo, nome):
        assunto = "Confirmação de Email - Plataforma Klyra"
        mensagem = f"Olá, {nome} Seu código de verificação é: {codigo}"
        remetente = settings.DEFAULT_FROM_EMAIL  
        
        try:
            send_mail(
            assunto,
            mensagem,
            remetente,
            [email],
            fail_silently=False,
        )

        except Exception as e:
            print(f"Erro ao enviar e-mail: {e}")
       
