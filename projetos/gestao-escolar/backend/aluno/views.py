from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView

from aluno.models import Aluno
from aluno.serializers import AlunoSerializer
from core.models import User
from core.permissions import IsAdminOrReadOnly
from escola.models import Instituicao

import random

class PaginacaoPadrao(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


def gerar_codigo_verificacao():
    return str(random.randint(100000, 999999))

def get_instituicao_do_admin(user):
    return Instituicao.objects.filter(admin=user).first()

class AlunoListCreateAPIView(ListCreateAPIView):
    queryset = Aluno.objects.all()
    serializer_class = AlunoSerializer
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
    pagination_class = PaginacaoPadrao
    filter_backends = [SearchFilter]
    search_fields = ['nome_completo', 'email', 'numero_aluno', 'telefone']

    def get_queryset(self):
        instituicao = get_instituicao_do_admin(self.request.user)
        if not instituicao:
            return Aluno.objects.none()
        return Aluno.objects.filter(instituicao=instituicao)

    def create(self, request, *args, **kwargs):
        instituicao = get_instituicao_do_admin(request.user)
        if not instituicao:
            return Response({"detail": "Apenas administradores de instituição podem criar alunos."},
                            status=status.HTTP_403_FORBIDDEN)

        email = request.data.get("email")
        nome = request.data.get("nome_completo")

        if not email or not nome:
            return Response({"detail": "Nome e e-mail são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"email": "Já existe um usuário com esse e-mail."}, status=status.HTTP_400_BAD_REQUEST)

        senha_temporaria = get_random_string(length=8)
        codigo_verificacao = gerar_codigo_verificacao()
        tem_def = request.data.get("tem_alguma_deficiencia", False)
        tem_alguma_deficiencia = tem_def in ["true", "True", True, "1", 1]


        # Criar usuário
        usuario = User.objects.create_user(
            email=email,
            tipo="aluno",
            nome=nome,
            password=senha_temporaria,
            is_active=False,
            codigo_verificacao=codigo_verificacao
        )

        aluno = Aluno.objects.create(
            usuario=usuario,
            instituicao=instituicao,
            nome_completo=nome,
            email=email,
            telefone=request.data.get("telefone"),
            data_nascimento=request.data.get("data_nascimento"),
            genero=request.data.get("genero"),
            nacionalidade=request.data.get("nacionalidade"),
            naturalidade=request.data.get("naturalidade"),
            documento_identidade=request.data.get("documento_identidade"),
            numero_documento=request.data.get("numero_documento"),
            data_emissao_documento=request.data.get("data_emissao_documento"),
            local_emissao_documento=request.data.get("local_emissao_documento"),
            endereco_completo=request.data.get("endereco_completo"),
            bairro=request.data.get("bairro"),
            cidade=request.data.get("cidade"),
            codigo_postal=request.data.get("codigo_postal"),
            tem_alguma_deficiencia=tem_alguma_deficiencia,
            descricao_deficiencia=request.data.get("descricao_deficiencia", ""),
            alergias=request.data.get("alergias", ""),
            plano_saude=request.data.get("plano_saude", ""),
            situacao_escolar_anterior=request.data.get("situacao_escolar_anterior", ""),
            escola_anterior=request.data.get("escola_anterior", ""),
            ano_concluido_anterior=request.data.get("ano_concluido_anterior", ""),
            pai_nome=request.data.get("pai_nome"),
            mae_nome=request.data.get("mae_nome"),
            responsavel_id=request.data.get("responsavel"),
            foto_perfil=request.data.get("foto_perfil")
        )


        # Enviar e-mail
        send_mail(
            subject="Acesso à Plataforma EduGestão - Confirmação de E-mail",
            message=(
                f"Olá, {nome},\n\n"
                f"Seu acesso foi criado na plataforma EduGestão.\n\n"
                f"📌 Email: {email}\n"
                f"🔑 Senha temporária: {senha_temporaria}\n"
                f"🧾 Código de verificação: {codigo_verificacao}\n\n"
                f"Acesse o sistema, confirme seu e-mail e altere sua senha."
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False
        )

        serializer = AlunoSerializer(aluno)
        return Response({
            "mensagem": "Aluno criado com sucesso. Um e-mail com as credenciais foi enviado.",
            "aluno": serializer.data
        }, status=status.HTTP_201_CREATED)




class AlunoDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return Aluno.objects.get(pk=pk)

    def tem_permissao(self, request, aluno):
        user = request.user

        # Admin da escola pode editar/ver apenas alunos da própria instituição
        if user.tipo == "admin":
            return get_instituicao_do_admin(user) == aluno.instituicao

        # O próprio aluno pode editar/ver seus dados
        if user.tipo == "aluno":
            return aluno.usuario == user

        return False

    def get(self, request, pk):
        try:
            aluno = self.get_object(pk)
        except Aluno.DoesNotExist:
            return Response({"detail": "Aluno não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        if not self.tem_permissao(request, aluno):
            return Response({"detail": "Você não tem permissão para acessar este aluno."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = AlunoSerializer(aluno)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            aluno = self.get_object(pk)
        except Aluno.DoesNotExist:
            return Response({"detail": "Aluno não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        if not self.tem_permissao(request, aluno):
            return Response({"detail": "Você não tem permissão para editar este aluno."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = AlunoSerializer(aluno, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            aluno = self.get_object(pk)
        except Aluno.DoesNotExist:
            return Response({"detail": "Aluno não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        # Somente admin pode deletar aluno
        if request.user.tipo != "admin" or get_instituicao_do_admin(request.user) != aluno.instituicao:
            return Response({"detail": "Você não tem permissão para deletar este aluno."},
                            status=status.HTTP_403_FORBIDDEN)

        aluno.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
