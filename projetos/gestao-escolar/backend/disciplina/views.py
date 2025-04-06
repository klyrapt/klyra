# views.py

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from django.db import IntegrityError

from .models import Disciplina
from .serializers import DisciplinaSerializer, DisciplinaCreateSerializer




class DisciplinaListCreateView(generics.ListCreateAPIView):
    queryset = Disciplina.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(instituicao__admin=self.request.user)

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return DisciplinaCreateSerializer
        return DisciplinaSerializer

    def perform_create(self, serializer):
        user = self.request.user
        instituicao = user.instituicao_admin.first()

        # Verifica se disciplina já existe
        nome = self.request.data.get("nome")
        disciplina_existente = Disciplina.objects.filter(nome=nome, instituicao=instituicao).first()

        if disciplina_existente:
            raise IntegrityError("Disciplina já existe para esta instituição.")

        serializer.save(instituicao=instituicao)
