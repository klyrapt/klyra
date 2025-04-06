from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Ensino
from .serializers import EnsinoSerializer
from escola.models import Instituicao  # para buscar a instituição do admin


def get_instituicao_do_admin(user):
    return Instituicao.objects.filter(admin=user).first()


class EnsinoListCreateView(generics.ListCreateAPIView):
    serializer_class = EnsinoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        instituicao = get_instituicao_do_admin(self.request.user)
        return Ensino.objects.filter(professor__instituicao=instituicao)

    def perform_create(self, serializer):
        return serializer.save()


class EnsinoDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Ensino.objects.get(pk=pk)
        except Ensino.DoesNotExist:
            return None

    def get(self, request, pk):
        ensino = self.get_object(pk)
        instituicao = get_instituicao_do_admin(request.user)

        if not ensino or ensino.professor.instituicao != instituicao:
            return Response({"detail": "Sem permissão ou não encontrado."}, status=status.HTTP_403_FORBIDDEN)

        serializer = EnsinoSerializer(ensino)
        return Response(serializer.data)

    def put(self, request, pk):
        ensino = self.get_object(pk)
        instituicao = get_instituicao_do_admin(request.user)

        if not ensino or ensino.professor.instituicao != instituicao:
            return Response({"detail": "Sem permissão ou não encontrado."}, status=status.HTTP_403_FORBIDDEN)

        serializer = EnsinoSerializer(ensino, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        ensino = self.get_object(pk)
        instituicao = get_instituicao_do_admin(request.user)

        if not ensino or ensino.professor.instituicao != instituicao:
            return Response({"detail": "Sem permissão ou não encontrado."}, status=status.HTTP_403_FORBIDDEN)

        ensino.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
