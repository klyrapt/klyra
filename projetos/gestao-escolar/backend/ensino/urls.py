from django.urls import path
from .views import EnsinoListCreateView, EnsinoDetailAPIView

urlpatterns = [
    path("ensinos/", EnsinoListCreateView.as_view(), name="ensino-list-create"),
    path("ensinos/<int:pk>/", EnsinoDetailAPIView.as_view(), name="ensino-detail"),
]
