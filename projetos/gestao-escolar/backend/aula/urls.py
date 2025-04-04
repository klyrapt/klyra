from django.urls import path
from .views import (
    GradeHorariaListCreateView, GradeHorariaDetailView,
    AulaListCreateView, AulaDetailView, GerarAulasPorIntervaloView
)

urlpatterns = [
    path('grades/', GradeHorariaListCreateView.as_view(), name='grade-list-create'),
    path('grades/<int:pk>/', GradeHorariaDetailView.as_view(), name='grade-detail'),
    path('aulas/', AulaListCreateView.as_view(), name='aula-list-create'),
    path('aulas/<int:pk>/', AulaDetailView.as_view(), name='aula-detail'),
    path('aulas/gerar/<int:turma_id>/', GerarAulasPorIntervaloView.as_view(), name='aulas-gerar'),
]
