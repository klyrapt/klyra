from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework.filters import SearchFilter
from rest_framework.pagination import PageNumberPagination

from .models import Disciplina
from .serializers import DisciplinaSerializer, DisciplinaCreateSerializer
from escola.models import Instituicao


class PaginacaoPadrao(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class DisciplinaListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = PaginacaoPadrao
    filter_backends = [SearchFilter]
    search_fields = ['nome']

    def get_queryset(self):
        user = self.request.user
        return Disciplina.objects.filter(instituicao__admin=user)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return DisciplinaCreateSerializer
        return DisciplinaSerializer

    def perform_create(self, serializer):
        user = self.request.user
        instituicao = Instituicao.objects.filter(admin=user).first()

        if not instituicao:
            raise ValidationError("Usuário não está vinculado a uma instituição.")

        nome = self.request.data.get("nome")
        if Disciplina.objects.filter(nome=nome, instituicao=instituicao).exists():
            raise ValidationError({"nome": "Já existe uma disciplina com esse nome nesta instituição."})

        serializer.save(instituicao=instituicao)


class DisciplinaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = DisciplinaSerializer
    lookup_field = "pk"

    def get_queryset(self):
        user = self.request.user
        return Disciplina.objects.filter(instituicao__admin=user)

    def perform_update(self, serializer):
        disciplina = self.get_object()
        user = self.request.user
        instituicao = Instituicao.objects.filter(admin=user).first()

        if disciplina.instituicao != instituicao:
            raise ValidationError("Você não tem permissão para editar esta disciplina.")

        nome = self.request.data.get("nome")
        if nome and Disciplina.objects.filter(nome=nome, instituicao=instituicao).exclude(id=disciplina.id).exists():
            raise ValidationError({"nome": "Já existe uma disciplina com esse nome nesta instituição."})

        serializer.save()

    def perform_destroy(self, instance):
        user = self.request.user
        if instance.instituicao.admin != user:
            raise ValidationError("Você não tem permissão para excluir esta disciplina.")
        instance.delete()
