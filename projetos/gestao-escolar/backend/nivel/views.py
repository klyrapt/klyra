from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Nivel, GradeCurricular
from .serializers import NivelSerializer, GradeCurricularSerializer


class NivelListCreateView(generics.ListCreateAPIView):
    serializer_class = NivelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Nivel.objects.filter(instituicao__admin=self.request.user)

    def perform_create(self, serializer):
        instituicao = self.request.user.instituicao_admin.first()
        serializer.save(instituicao=instituicao)


class NivelDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NivelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Nivel.objects.filter(instituicao__admin=self.request.user)


class GradeCurricularListCreateView(generics.ListCreateAPIView):
    serializer_class = GradeCurricularSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GradeCurricular.objects.filter(nivel__instituicao__admin=self.request.user)

    def perform_create(self, serializer):
        return serializer.save()


class GradeCurricularDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GradeCurricularSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return GradeCurricular.objects.filter(nivel__instituicao__admin=self.request.user)
