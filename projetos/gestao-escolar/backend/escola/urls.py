from django.urls import path
from .views import InstituicaoCreateAPIView

urlpatterns = [
    path("instituicoes/", InstituicaoCreateAPIView.as_view(), name="criar-instituicao"),
]
