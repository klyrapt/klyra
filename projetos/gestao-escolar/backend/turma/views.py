# turma/views.py (ajustado)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from turma.models import Turma
from turma.serializers import TurmaSerializer
from escola.models import Instituicao
from nivel.models import Nivel
from rest_framework.generics import ListCreateAPIView

from professor.models import Professor

from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter




class PaginacaoPadrao(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


def is_admin_da_escola(user):
    return Instituicao.objects.filter(admin=user).first()

class TurmaListCreateAPIView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]

    serializer_class = TurmaSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PaginacaoPadrao
    filter_backends = [SearchFilter]

    search_fields = ['nome', 'ano_letivo', 'diretor_turma__usuario__nome']


    def get_queryset(self):
        user = self.request.user
        instituicao = is_admin_da_escola(user)

        if instituicao:
            return Turma.objects.filter(instituicao=instituicao)
        elif user.tipo in ["aluno", "responsavel", "professor"]:
            return Turma.objects.none()
        else:
            return Turma.objects.none()  # evita erro com Response




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





class TurmaDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            instituicao = is_admin_da_escola(user)
            turma = Turma.objects.get(pk=pk)

            if turma.instituicao != instituicao:
                return None
            return turma
        except Turma.DoesNotExist:
            return None

    def get(self, request, pk):
        turma = self.get_object(pk, request.user)
        if not turma:
            return Response({"detail": "Turma não encontrada ou sem permissão."}, status=404)

        serializer = TurmaSerializer(turma)
        return Response(serializer.data)

    def put(self, request, pk):
        turma = self.get_object(pk, request.user)
        if not turma:
            return Response({"detail": "Turma não encontrada ou sem permissão."}, status=404)

        data = request.data.copy()
        serializer = TurmaSerializer(turma, data=data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        turma = self.get_object(pk, request.user)
        if not turma:
            return Response({"detail": "Turma não encontrada ou sem permissão."}, status=404)

        turma.delete()
        return Response(status=204)
