# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated


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
        serializer.save(instituicao=instituicao)
    


class DisciplinaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Garante que só acesse disciplinas da instituição do usuário logado
        return self.queryset.filter(instituicao__admin=self.request.user)