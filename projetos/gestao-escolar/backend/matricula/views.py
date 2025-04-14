from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from .models import Matricula
from .serializers import MatriculaSerializer, MatriculaCreateUpdateSerializer
from escola.models import Instituicao
from core.permissions import IsAdminOrReadOnly

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter


def get_instituicao_do_admin(user):
    return Instituicao.objects.filter(admin=user).first()


class MatriculaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["aluno", "turma", "ano_letivo", "status", "numero_matricula"]
    ordering = ['-data_matricula']

    def get_queryset(self):
        instituicao = get_instituicao_do_admin(self.request.user)
        return Matricula.objects.filter(instituicao=instituicao)

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return MatriculaCreateUpdateSerializer
        return MatriculaSerializer

    def perform_create(self, serializer):
        instituicao = get_instituicao_do_admin(self.request.user)
        serializer.save(instituicao=instituicao)

    def perform_update(self, serializer):
        serializer.save()

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def confirmar(self, request, pk=None):
        matricula = get_object_or_404(Matricula, pk=pk)

        if matricula.instituicao != get_instituicao_do_admin(request.user):
            return Response({"erro": "Você não tem permissão para confirmar esta matrícula."},
                            status=status.HTTP_403_FORBIDDEN)

        if matricula.status == "confirmada":
            return Response({"erro": "A matrícula já está confirmada."},
                            status=status.HTTP_400_BAD_REQUEST)

        if matricula.turma.capacidade:
            total_confirmados = Matricula.objects.filter(
                turma=matricula.turma,
                ano_letivo=matricula.ano_letivo,
                status="confirmada"
            ).count()
            if total_confirmados >= matricula.turma.capacidade:
                return Response({"erro": "Capacidade máxima da turma atingida."},
                                status=status.HTTP_400_BAD_REQUEST)

        try:
            matricula.confirmar()
            return Response({"mensagem": "Matrícula confirmada com sucesso!"})
        except Exception as e:
            return Response({"erro": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def cancelar(self, request, pk=None):
        matricula = get_object_or_404(Matricula, pk=pk)

        if matricula.instituicao != get_instituicao_do_admin(request.user):
            return Response({"erro": "Você não tem permissão para cancelar esta matrícula."},
                            status=status.HTTP_403_FORBIDDEN)

        if matricula.status == "cancelada":
            return Response({"erro": "A matrícula já está cancelada."},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            matricula.cancelar()
            return Response({"mensagem": "Matrícula cancelada com sucesso!"})
        except Exception as e:
            return Response({"erro": str(e)}, status=status.HTTP_400_BAD_REQUEST)
