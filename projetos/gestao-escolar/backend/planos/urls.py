from django.urls import path
from .views import PlanoListView

urlpatterns = [
    path('', PlanoListView.as_view(), name='lista-planos'),
]
