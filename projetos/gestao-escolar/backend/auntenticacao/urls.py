from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import PasswordResetRequestView, PasswordResetConfirmView,ChangePasswordView

from .views import CustomTokenBlacklistView


urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('logout/', CustomTokenBlacklistView.as_view(), name='logout'),

    path("password-reset/", PasswordResetRequestView.as_view(), name="password-reset"),
    path("password-reset/<int:user_id>/<token>/", PasswordResetConfirmView.as_view(), name="password-reset-confirm"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
]
