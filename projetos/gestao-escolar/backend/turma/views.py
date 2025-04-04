from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from core.permissions import IsAdminOrReadOnly, IsDonoDaEscola
from rest_framework.permissions import IsAuthenticated

from .serializers import TurmaSerializer
from .models import Turma


class TurmaListCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly, IsDonoDaEscola]
    def get(self, request):
        turmas = Turma.objects.all()
        serializer = TurmaSerializer(turmas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = TurmaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

