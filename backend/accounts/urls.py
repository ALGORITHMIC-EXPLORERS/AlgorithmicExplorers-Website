from django.urls import path

from .views import (
    FacebookLogin,
    GoogleLogin,
    LoginView,
    MicrosoftLogin,
    RegisterView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('oauth/google/', GoogleLogin.as_view(), name='google-login'),
    path('oauth/facebook/', FacebookLogin.as_view(), name='facebook-login'),
    path('oauth/microsoft/', MicrosoftLogin.as_view(), name='microsoft-login'),
]
