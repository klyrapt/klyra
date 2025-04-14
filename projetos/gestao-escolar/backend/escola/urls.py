from django.urls import path
from .views import InstituicaoCreateAPIView,InstituicaoUpdateDeleteAPIView,InstituicaoDetailAPIView

urlpatterns = [
    path("instituicoes/", InstituicaoCreateAPIView.as_view(), name="criar-instituicao"),
    path("instituicoes/editar/", InstituicaoUpdateDeleteAPIView.as_view(), name="instituicao-editar-deletar"),
    path("instituicao/", InstituicaoDetailAPIView.as_view(), name="instituicao-detail"),
]
