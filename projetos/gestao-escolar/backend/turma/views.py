# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from turma.models import Turma
from turma.serializers import TurmaSerializer

from django.shortcuts import get_object_or_404



from escola.models import Instituicao

def is_admin_da_escola(user):
    return Instituicao.objects.filter(admin=user).first()


class TurmaListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        instituicao = is_admin_da_escola(user)

        if instituicao:
            turmas = Turma.objects.filter(instituicao=instituicao)
        elif user.tipo in ["aluno", "responsavel", "professor"]:
            turmas = Turma.objects.all()  # Ajuste conforme filtro de visibilidade
        else:
            return Response({"detail": "Sem permissão."}, status=status.HTTP_403_FORBIDDEN)

        serializer = TurmaSerializer(turmas, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        instituicao = is_admin_da_escola(user)

        if not instituicao:
            return Response({"detail": "Apenas administradores de instituição podem criar turmas."},
                            status=status.HTTP_403_FORBIDDEN)

        data = request.data.copy()
        data["instituicao"] = instituicao.id

        serializer = TurmaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TurmaDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Turma, pk=pk)

    def get(self, request, pk):
        turma = self.get_object(pk)
        instituicao = is_admin_da_escola(request.user)

        if request.user.tipo == "admin" and turma.instituicao != instituicao:
            return Response({"detail": "Sem permissão."}, status=status.HTTP_403_FORBIDDEN)

        serializer = TurmaSerializer(turma)
        return Response(serializer.data)

    def put(self, request, pk):
        turma = self.get_object(pk)
        instituicao = is_admin_da_escola(request.user)

        if turma.instituicao != instituicao:
            return Response({"detail": "Sem permissão para editar."}, status=status.HTTP_403_FORBIDDEN)

        serializer = TurmaSerializer(turma, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        turma = self.get_object(pk)
        instituicao = is_admin_da_escola(request.user)

        if turma.instituicao != instituicao:
            return Response({"detail": "Sem permissão para deletar."}, status=status.HTTP_403_FORBIDDEN)

        turma.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
