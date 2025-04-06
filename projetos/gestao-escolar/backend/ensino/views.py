from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Ensino
from .serializers import EnsinoSerializer





class EnsinoListCreateView(generics.ListCreateAPIView):
    queryset = Ensino.objects.all()
    serializer_class = EnsinoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Ensino.objects.filter(
            professor__instituicao=user.instituicao
        )
