from django.urls import path
from .views import DisciplinaListCreateView, DisciplinaDetailView

urlpatterns = [
    path("disciplinas/", DisciplinaListCreateView.as_view(), name="disciplina-list-create"),
    path("disciplinas/<int:pk>/", DisciplinaDetailView.as_view(), name="disciplina-detail"),
]
