# escola/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import InstituicaoCreateSerializer

from rest_framework import  permissions
from .models import Instituicao
from .serializers import InstituicaoUpdateSerializer  , InstituicaoDetailSerializer
from django.shortcuts import get_object_or_404




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




class InstituicaoUpdateDeleteAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

   
    def get_object(self, user):
        return get_object_or_404(Instituicao, admin=user)

    def put(self, request):
        instituicao = self.get_object(request.user)
        serializer = InstituicaoUpdateSerializer(instituicao, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensagem": "Instituição atualizada com sucesso."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        instituicao = self.get_object(request.user)
        serializer = InstituicaoUpdateSerializer(instituicao, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensagem": "Instituição atualizada com sucesso."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        instituicao = self.get_object(request.user)
        instituicao.delete()
        return Response({"mensagem": "Instituição deletada com sucesso."}, status=status.HTTP_204_NO_CONTENT)
    

# ver detalhes da instituição

class InstituicaoDetailAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get_object(self, user):
        return get_object_or_404(Instituicao, admin=user)
    def get(self, request):
        instituicao = self.get_object(request.user)
        
        serializer = InstituicaoDetailSerializer(instituicao)
        return Response(serializer.data)
    