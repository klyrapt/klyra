# core/urls.py

from django.urls import path
from .views import ConfirmarEmailAPIView

urlpatterns = [
    path("verificar-email/", ConfirmarEmailAPIView.as_view(), name="verificar-email"),
]
