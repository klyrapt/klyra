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

from django.db.models import Q
from matricula.models import NumeroAluno

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
    search_fields = ['nome_completo', 'email',  'telefone']
    ordering = ['nome_completo']

    def get_queryset(self):
        instituicao = get_instituicao_do_admin(self.request.user)
        if not instituicao:
            return Aluno.objects.none()

        queryset = Aluno.objects.filter(instituicao=instituicao)

        search = self.request.query_params.get("search")
        if search:
            numero_ids = NumeroAluno.objects.filter(
                numero_aluno__iexact=search,
                matricula__aluno__instituicao=instituicao
            ).values_list("matricula__aluno_id", flat=True)

            queryset = queryset.filter(
                Q(nome_completo__icontains=search) |
                Q(email__icontains=search) |
                Q(telefone__icontains=search) |
                Q(id__in=numero_ids)
            )

        return queryset.order_by("nome_completo")  # 👈 isso aqui resolve o aviso






    def create(self, request, *args, **kwargs):
        instituicao = get_instituicao_do_admin(request.user)
        if not instituicao:
            return Response(
                {"detail": "Apenas administradores de instituição podem criar alunos."},
                status=status.HTTP_403_FORBIDDEN
            )

        email = request.data.get("email")
        nome = request.data.get("nome_completo")

        if not email or not nome:
            return Response({"detail": "Nome e e-mail são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"email": "Já existe um usuário com esse e-mail."}, status=status.HTTP_400_BAD_REQUEST)

        senha_temporaria = get_random_string(length=8)
        codigo_verificacao = gerar_codigo_verificacao()

        # Criação do usuário do aluno
        usuario = User.objects.create_user(
            email=email,
            nome=nome,
            tipo="aluno",
            password=senha_temporaria,
            is_active=False,
            codigo_verificacao=codigo_verificacao
        )

        # Copiamos os dados e substituímos apenas os campos necessários
        aluno_data = request.data.copy()
        aluno_data["instituicao"] = instituicao.id

        # Usamos o serializer com instance do usuário em vez de passar o ID
        serializer = AlunoSerializer(data=aluno_data, context={"request": request})
        if serializer.is_valid():
            aluno = serializer.save(usuario=usuario)  # Passando o usuário aqui

            # Envio do e-mail
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

            return Response({
                "mensagem": "Aluno criado com sucesso. Um e-mail com as credenciais foi enviado.",
                "aluno": AlunoSerializer(aluno).data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




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