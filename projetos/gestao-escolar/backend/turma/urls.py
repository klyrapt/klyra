# turma/urls.py

from django.urls import path
from .views import TurmaListCreateAPIView, TurmaDetailAPIView

urlpatterns = [
    path("turmas/", TurmaListCreateAPIView.as_view(), name="turma-list-create"),
    path("turmas/<int:pk>/", TurmaDetailAPIView.as_view(), name="turma-detail"),
]
