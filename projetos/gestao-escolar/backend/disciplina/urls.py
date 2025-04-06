from django.urls import path
from .views import DisciplinaListCreateView

urlpatterns = [
    path("disciplinas/", DisciplinaListCreateView.as_view(), name="disciplina-list-create"),
    
]
