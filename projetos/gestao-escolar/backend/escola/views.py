# escola/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import InstituicaoCreateSerializer


class InstituicaoCreateAPIView(APIView):
    def post(self, request):
        serializer = InstituicaoCreateSerializer(data=request.data)
        if serializer.is_valid():
            instituicao = serializer.save()
            return Response({
                "mensagem": "Instituição criada com sucesso. Verifique seu e-mail para confirmar o cadastro.",
                "instituicao_id": instituicao.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


