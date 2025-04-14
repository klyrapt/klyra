from rest_framework import generics, permissions
from .models import Sala
from .serializers import SalaSerializer
from escola.models import Instituicao

def get_instituicao_do_admin(user):
    return Instituicao.objects.filter(admin=user).first()

class SalaListCreateView(generics.ListCreateAPIView):
    serializer_class = SalaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        instituicao = get_instituicao_do_admin(self.request.user)
        return Sala.objects.filter(instituicao=instituicao) if instituicao else Sala.objects.none()

class SalaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SalaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        instituicao = get_instituicao_do_admin(self.request.user)
        return Sala.objects.filter(instituicao=instituicao) if instituicao else Sala.objects.none()
