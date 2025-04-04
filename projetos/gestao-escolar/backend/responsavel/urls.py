from django.urls import path
from .views import (ResponsavelListCreateAPIView, ResponsavelDetailAPIView,)




urlpatterns = [
    path('responsavel/', ResponsavelListCreateAPIView.as_view(), name='responsavel_list'),
    path('responsavel/<int:pk>/', ResponsavelDetailAPIView.as_view(), name='responsavel')
]
