# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from aluno.models import Aluno
from aluno.serializers import AlunoSerializer
from core.permissions import IsAdminOrReadOnly


from core.models import User
from django.utils.crypto import get_random_string
from django.core.mail import send_mail  # caso queira enviar e-mail


# Aluno CRUD
class AlunoListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def get(self, request):
        alunos = Aluno.objects.filter(instituicao=request.user.instituicao)
        serializer = AlunoSerializer(alunos, many=True)
        return Response(serializer.data)

    def post(self, request):
        senha_temporaria = get_random_string(length=8)
        usuario = User.objects.create_user(
            email=request.data.get("email"),
            tipo="aluno",
            nome=request.data.get("nome_completo"),
            password=senha_temporaria
        )

        # Criar aluno com campos principais (validação depois)
        aluno = Aluno(
            usuario=usuario,
            nome_completo=request.data.get("nome_completo"),
            instituicao=request.user.instituicao,
        )
        aluno.save()

        send_mail(
            subject="Bem-vindo à plataforma EduGestão",
            message=f"Olá, {aluno.nome_completo}!\n\nSeu acesso foi criado:\nE-mail: {usuario.email}\nSenha: {senha_temporaria}",
            from_email="no-reply@edugestao.com",
            recipient_list=[usuario.email],
            fail_silently=True
        )

        serializer = AlunoSerializer(aluno)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class AlunoDetailAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def get_object(self, pk):
        return Aluno.objects.get(pk=pk)

    def get(self, request, pk):
        aluno = self.get_object(pk)
        serializer = AlunoSerializer(aluno)
        return Response(serializer.data)

    def put(self, request, pk):
        aluno = self.get_object(pk)
        serializer = AlunoSerializer(aluno, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        aluno = self.get_object(pk)
        aluno.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

