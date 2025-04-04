from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ConfirmarEmailSerializer




class ConfirmarEmailAPIView(APIView):
    def post(self, request):
        serializer = ConfirmarEmailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensagem": "E-mail confirmado com sucesso. Agora você pode fazer login."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
