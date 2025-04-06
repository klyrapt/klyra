from django.urls import path
from professor.views import (
    ProfessorListCreateAPIView,
    ProfessorDetailAPIView,
)



urlpatterns = [
    path("professores/", ProfessorListCreateAPIView.as_view(), name="professor-list-create"),
    path("professores/<int:pk>/", ProfessorDetailAPIView.as_view(), name="professor-detail"),
]
