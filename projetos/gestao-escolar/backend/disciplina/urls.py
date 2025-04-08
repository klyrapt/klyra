from django.urls import path

from .views import (
    DisciplinaListCreateView,
    DisciplinaRetrieveUpdateDestroyView
)

urlpatterns = [
    path('disciplinas/', DisciplinaListCreateView.as_view(), name='disciplina-list-create'),
    path('disciplinas/<int:pk>/', DisciplinaRetrieveUpdateDestroyView.as_view(), name='disciplina-detail'),
]
