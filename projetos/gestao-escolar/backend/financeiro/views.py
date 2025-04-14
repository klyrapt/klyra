from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Recibo
from .serializers import ReciboSerializer
from escola.models import Instituicao

from utils.paginacao import PaginacaoPadrao


from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Preco
from .serializers import PrecoSerializer





def get_instituicao_do_admin(user):
    return Instituicao.objects.filter(admin=user).first()

class ReciboListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        tipo = request.query_params.get("tipo")
        ano = request.query_params.get("ano")

        if user.tipo == "admin":
            instituicao = get_instituicao_do_admin(user)
            if not instituicao:
                return Response({"detail": "Instituição não encontrada."}, status=403)
            queryset = Recibo.objects.filter(instituicao=instituicao)
        elif user.tipo == "aluno":
            queryset = Recibo.objects.filter(aluno__usuario=user)
        else:
            return Response({"detail": "Você não tem permissão para acessar os recibos."}, status=403)

        if tipo:
            queryset = queryset.filter(tipo=tipo)

        if ano:
            queryset = queryset.filter(enviado_em__year=ano)

        queryset = queryset.order_by("-enviado_em")

        # Paginação
        paginator = PaginacaoPadrao()
        page = paginator.paginate_queryset(queryset, request)
        serializer = ReciboSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)





class PrecoListCreateAPIView(ListCreateAPIView):
    serializer_class = PrecoSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = PaginacaoPadrao

    def get_queryset(self):
        user = self.request.user
        tipo = self.request.query_params.get("tipo")
        nivel = self.request.query_params.get("nivel")

        if user.tipo != "admin":
            return Preco.objects.none()

        instituicao = get_instituicao_do_admin(user)
        queryset = Preco.objects.filter(instituicao=instituicao)

        if tipo:
            queryset = queryset.filter(tipo=tipo)
        if nivel:
            queryset = queryset.filter(nivel_id=nivel)

        return queryset

    def perform_create(self, serializer):
        instituicao = get_instituicao_do_admin(self.request.user)
        serializer.save(instituicao=instituicao)



class PrecoRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = PrecoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        instituicao = get_instituicao_do_admin(self.request.user)
        return Preco.objects.filter(instituicao=instituicao)