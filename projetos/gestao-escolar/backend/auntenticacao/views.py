from rest_framework import status
from rest_framework.response import Response



from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
#from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken



from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password


from core.models import User


class CustomTokenBlacklistView(APIView):
    """Logout do usuário (invalidando o refresh token)"""
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh_token")  # O refresh token deve ser enviado no body
            if not refresh_token:
                return Response({"error": "O refresh token é obrigatório para logout."}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()  # Invalida o token

            return Response({"message": "Logout realizado com sucesso! Token foi invalidado."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception :
            return Response({"error": "Token inválido ou já foi revogado." }, status=status.HTTP_400_BAD_REQUEST)   



class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        usuario = User.objects.filter(email=email).first()

        if not usuario:
            return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        # Gerar token de redefinição de senha
        token = default_token_generator.make_token(usuario)

        #reset_link = request.build_absolute_uri(reverse('password-reset-confirm', kwargs={'user_id': usuario.id, 'token': token}))

        frontend_url = "http://localhost:3000"  # ou domínio real da aplicação
        reset_link = f"{frontend_url}/redefinir-senha/{usuario.id}/{token}/"


        # Enviar e-mail ou SMS com o link de redefinição
        if usuario.email:
            send_mail(
                "Redefinição de Senha",
                f"Use este link para redefinir sua senha: {reset_link}",
                "mamadusama19@gmail.com",
                [usuario.email],
                fail_silently=False,
            )

        return Response({"message": "Mensagem enviado com sucesso."}, status=status.HTTP_200_OK)




class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, user_id, token):
        try:
            usuario = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({"error": "Usuário não encontrado"}, status=status.HTTP_404_NOT_FOUND)

        if not default_token_generator.check_token(usuario, token):
            return Response({"error": "Token inválido ou expirado."}, status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get("new_password")
        if not new_password:
            return Response({"error": "Nova senha é obrigatória."}, status=status.HTTP_400_BAD_REQUEST)

        usuario.set_password(new_password)
        usuario.save()
        return Response({"message": "Senha redefinida com sucesso."}, status=status.HTTP_200_OK)



class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        usuario = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")

        if not check_password(current_password, usuario.password):
            return Response({"error": "Senha atual incorreta."}, status=status.HTTP_400_BAD_REQUEST)

        if current_password == new_password:
            return Response({"error": "A nova senha não pode ser igual à senha atual."}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 6:
            return Response({"error": "A nova senha deve ter pelo menos 6 caracteres."}, status=status.HTTP_400_BAD_REQUEST)

        usuario.set_password(new_password)
        usuario.senha_temporaria = False
        usuario.save()
        return Response({"message": "Senha alterada com sucesso."}, status=status.HTTP_200_OK)
