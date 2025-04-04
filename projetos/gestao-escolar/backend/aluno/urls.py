from django.urls import path
from .views import AlunoListCreateAPIView, AlunoDetailAPIView

urlpatterns = [
    path("alunos/", AlunoListCreateAPIView.as_view(), name="aluno-list-create"),
    path("alunos/<int:pk>/", AlunoDetailAPIView.as_view(), name="aluno-detail"),
]
