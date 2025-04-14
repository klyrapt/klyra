from django.urls import path
from .views import ReciboListAPIView, PrecoListCreateAPIView,PrecoRetrieveUpdateDestroyAPIView

urlpatterns = [
    path("recibos/", ReciboListAPIView.as_view()),
    path("precos/", PrecoListCreateAPIView.as_view(), name="listar-criar-precos"),
    path("precos/<int:pk>/", PrecoRetrieveUpdateDestroyAPIView.as_view(), name="editar-deletar-preco"),
]
