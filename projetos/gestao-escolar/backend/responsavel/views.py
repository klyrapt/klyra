# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from responsavel.serializers import ResponsavelSerializer
from core.permissions import IsAdminOrReadOnly, IsResponsavel

from responsavel.models import Responsavel


# Responsavel CRUD
class ResponsavelListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def get(self, request):
        responsaveis = Responsavel.objects.all()
        serializer = ResponsavelSerializer(responsaveis, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ResponsavelSerializer(data=request.data)
        if serializer.is_valid():
            responsavel = serializer.save()
            return Response(ResponsavelSerializer(responsavel).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResponsavelDetailAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly | IsResponsavel]

    def get_object(self, pk):
        return Responsavel.objects.get(pk=pk)

    def get(self, request, pk):
        responsavel = self.get_object(pk)
        serializer = ResponsavelSerializer(responsavel)
        return Response(serializer.data)

    def put(self, request, pk):
        responsavel = self.get_object(pk)
        serializer = ResponsavelSerializer(responsavel, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        responsavel = self.get_object(pk)
        responsavel.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
