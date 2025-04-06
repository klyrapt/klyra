# turma/urls.py

from django.urls import path
from .views import TurmaListCreateAPIView

urlpatterns = [
    path("turmas/", TurmaListCreateAPIView.as_view(), name="turma-list-create"),
    
]
