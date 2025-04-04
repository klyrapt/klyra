from django.urls import path
from .views import (
    NivelListCreateView,
    NivelDetailView,
    GradeCurricularListCreateView,
    GradeCurricularDetailView,
)

urlpatterns = [
    path("niveis/", NivelListCreateView.as_view(), name="nivel-list-create"),
    path("niveis/<int:pk>/", NivelDetailView.as_view(), name="nivel-detail"),

    path("grades/", GradeCurricularListCreateView.as_view(), name="grade-list-create"),
    path("grades/<int:pk>/", GradeCurricularDetailView.as_view(), name="grade-detail"),
]
