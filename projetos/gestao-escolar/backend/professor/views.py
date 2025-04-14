from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.pagination import PageNumberPagination
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from django.conf import settings

from core.models import User
from professor.models import Professor
from professor.serializers import ProfessorSerializer
from escola.models import Instituicao

from rest_framework.views import APIView

# Paginação padrão
class PaginacaoPadrao(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100

def get_instituicao_do_admin(user):
    return Instituicao.objects.filter(admin=user).first()

class ProfessorViewSet(viewsets.ModelViewSet):
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PaginacaoPadrao
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    
    filterset_fields = ["instituicao"]
    search_fields = ["usuario__nome", "usuario__email", "telefone"]
    ordering = ["usuario__nome"]

    def get_queryset(self):
        instituicao = get_instituicao_do_admin(self.request.user)
        return Professor.objects.filter(instituicao=instituicao)

    def create(self, request, *args, **kwargs):
        instituicao = get_instituicao_do_admin(request.user)
        if not instituicao:
            return Response({"detail": "Apenas administradores podem adicionar professores."},
                            status=status.HTTP_403_FORBIDDEN)

        nome = request.data.get("nome")
        email = request.data.get("email")
        senha_temporaria = get_random_string(length=8)
        codigo_verificacao = get_random_string(length=6, allowed_chars="0123456789")

        usuario = User.objects.create_user(
            nome=nome,
            email=email,
            tipo="professor",
            password=senha_temporaria,
            is_active=False,
            codigo_verificacao=codigo_verificacao
        )

        professor = Professor.objects.create(
            usuario=usuario,
            instituicao=instituicao,
            formacao=request.data.get("formacao", ""),
            especializacao=request.data.get("especializacao", ""),
            biografia=request.data.get("biografia", ""),
            foto=request.FILES.get("foto"),
            telefone=request.data.get("telefone", ""),
            data_nascimento=request.data.get("data_nascimento"),
            genero=request.data.get("genero", ""),
            nacionalidade=request.data.get("nacionalidade", ""),
            naturalidade=request.data.get("naturalidade", ""),
            endereco_completo=request.data.get("endereco_completo", ""),
            bairro=request.data.get("bairro", ""),
            cidade=request.data.get("cidade", ""),
            codigo_postal=request.data.get("codigo_postal", ""),
            data_admissao=request.data.get("data_admissao"),
            regime_trabalho=request.data.get("regime_trabalho", ""),
            ativo=True
        )

        send_mail(
            subject="Cadastro como Professor - Plataforma EduGestão",
            message=f"Olá, {nome}!\n\nVocê foi cadastrado como professor na instituição {instituicao.nome}.\n\n"
                    f"Acesse com:\nEmail: {email}\nSenha temporária: {senha_temporaria}\n"
                    f"Código de verificação: {codigo_verificacao}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )

        return Response({
            "mensagem": "Professor criado com sucesso. Verifique o e-mail para ativar a conta.",
            "professor_id": professor.id
        }, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        professor = self.get_object()
        if not self._has_permission(request.user, professor):
            return Response({"detail": "Sem permissão para atualizar este professor."},
                            status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(professor, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        professor = self.get_object()
        if not self._has_permission(request.user, professor):
            return Response({"detail": "Sem permissão para deletar este professor."},
                            status=status.HTTP_403_FORBIDDEN)

        professor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def _has_permission(self, user, professor):
        if user.tipo == "admin":
            return get_instituicao_do_admin(user) == professor.instituicao
        elif user.tipo == "professor":
            return professor.usuario == user
        return False







class ProfessorDetailAPIView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return Professor.objects.get(pk=pk)

    def has_permission_to_edit(self, request, professor):
        user = request.user

        # Admin da instituição pode editar apenas professores da sua escola
        if user.tipo == "admin":
            instituicao = get_instituicao_do_admin(user)
            return instituicao == professor.instituicao

        # Professor só pode editar seu próprio registro
        if user.tipo == "professor":
            return professor.usuario == user

        return False

    def get(self, request, pk):
        try:
            professor = self.get_object(pk)
        except Professor.DoesNotExist:
            return Response({"detail": "Professor não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        user = request.user
        if user.tipo == "admin":
            if professor.instituicao != get_instituicao_do_admin(user):
                return Response({"detail": "Sem permissão."}, status=status.HTTP_403_FORBIDDEN)
        elif user.tipo == "professor":
            if professor.usuario != user:
                return Response({"detail": "Você só pode acessar seus próprios dados."}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"detail": "Sem permissão para acessar dados de professor."}, status=status.HTTP_403_FORBIDDEN)

        serializer = ProfessorSerializer(professor)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            professor = self.get_object(pk)
        except Professor.DoesNotExist:
            return Response({"detail": "Professor não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        if not self.has_permission_to_edit(request, professor):
            return Response({"detail": "Sem permissão para editar este professor."}, status=status.HTTP_403_FORBIDDEN)

        serializer = ProfessorSerializer(professor, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            professor = self.get_object(pk)
        except Professor.DoesNotExist:
            return Response({"detail": "Professor não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        # Apenas o admin pode deletar professores
        if request.user.tipo != "admin" or get_instituicao_do_admin(request.user) != professor.instituicao:
            return Response({"detail": "Apenas o administrador da escola pode deletar professores."}, status=status.HTTP_403_FORBIDDEN)

        professor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)