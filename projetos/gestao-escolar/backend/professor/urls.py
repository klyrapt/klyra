from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProfessorViewSet,ProfessorDetailAPIView

router = DefaultRouter()
router.register(r'professores', ProfessorViewSet, basename='professor')
router.register(r'professores/<int:pk>/', ProfessorDetailAPIView, basename='dados-prof')

urlpatterns = [
    path('', include(router.urls)),
]
