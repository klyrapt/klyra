# turma/views.py (ajustado)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from turma.models import Turma
from turma.serializers import TurmaSerializer
from escola.models import Instituicao
from nivel.models import Nivel
from professor.models import Professor




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
            turmas = Turma.objects.none()  # ou turmas visíveis para o perfil
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

        # Verificar se o nível pertence à instituição
        try:
            nivel = Nivel.objects.get(pk=data.get("nivel"))
            if nivel.instituicao != instituicao:
                return Response({"nivel": "Você não pode usar um nível de outra instituição."},
                                status=status.HTTP_400_BAD_REQUEST)
        except Nivel.DoesNotExist:
            return Response({"nivel": "Nível inválido ou inexistente."},
                            status=status.HTTP_400_BAD_REQUEST)

        # Verificar se o diretor pertence à instituição
        diretor_id = data.get("diretor_turma")
        if diretor_id:
            try:
                diretor = Professor.objects.get(pk=diretor_id)
                if diretor.instituicao != instituicao:
                    return Response({"diretor_turma": "O professor não pertence à sua instituição."},
                                    status=status.HTTP_400_BAD_REQUEST)
            except Professor.DoesNotExist:
                return Response({"diretor_turma": "Professor inválido."},
                                status=status.HTTP_400_BAD_REQUEST)

        serializer = TurmaSerializer(data=data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
