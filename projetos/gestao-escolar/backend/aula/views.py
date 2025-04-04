from rest_framework.response import Response
from rest_framework import status
from aula.models import Aula
from turma.models import Turma
from .serializers import AulaSerializer

from rest_framework import generics, views
from datetime import date

from .models import GradeHoraria
from .serializers import GradeHorariaSerializer

from core.permissions import IsAdminOrReadOnly, IsProfessor
from rest_framework.permissions import IsAuthenticated


class GradeHorariaListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    queryset = GradeHoraria.objects.all()
    serializer_class = GradeHorariaSerializer

class GradeHorariaDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    queryset = GradeHoraria.objects.all()
    serializer_class = GradeHorariaSerializer



class AulaListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsProfessor | IsAdminOrReadOnly]
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer

class AulaDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsProfessor | IsAdminOrReadOnly]
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer





class GerarAulasPorIntervaloView(views.APIView):
    def post(self, request, turma_id):
        data_inicio = request.data.get("data_inicio")
        data_fim = request.data.get("data_fim")

        if not data_inicio or not data_fim:
            return Response({"erro": "Informe data_inicio e data_fim"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            turma = Turma.objects.get(id=turma_id)
            aulas_criadas = Aula.gerar_aulas_semanais(
                turma,
                date.fromisoformat(data_inicio),
                date.fromisoformat(data_fim)
            )
            return Response(AulaSerializer(aulas_criadas, many=True).data, status=status.HTTP_201_CREATED)

        except Turma.DoesNotExist:
            return Response({"erro": "Turma não encontrada"}, status=status.HTTP_404_NOT_FOUND)