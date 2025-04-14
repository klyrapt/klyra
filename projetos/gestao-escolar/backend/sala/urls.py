from django.urls import path
from .views import SalaListCreateView, SalaRetrieveUpdateDestroyView

urlpatterns = [
    path("salas/", SalaListCreateView.as_view(), name="sala-list-create"),
    path("salas/<int:pk>/", SalaRetrieveUpdateDestroyView.as_view(), name="sala-detail"),
]
