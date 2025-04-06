from django.urls import path
from .views import EnsinoListCreateView






urlpatterns = [
    path('', EnsinoListCreateView.as_view(), name='ensino-list-create'),
]
