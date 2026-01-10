from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.microsoft.views import MicrosoftGraphOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import LoginSerializer, RegisterSerializer


def _build_auth_payload(user):
	refresh = RefreshToken.for_user(user)
	is_verified = getattr(user, 'profile', None).is_verified if hasattr(user, 'profile') else False
	return {
		'user': {
			'id': user.id,
			'first_name': user.first_name,
			'last_name': user.last_name,
			'email': user.email,
			'is_verified_guru': is_verified,
			'is_staff': user.is_staff,
			'is_superuser': user.is_superuser,
		},
		'tokens': {
			'refresh': str(refresh),
			'access': str(refresh.access_token),
		},
	}


class RegisterView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = RegisterSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.save()
			data = _build_auth_payload(user)
			data['message'] = 'Account created successfully.'
			return Response(data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		serializer = LoginSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.validated_data['user']
			data = _build_auth_payload(user)
			data['message'] = 'Login successful.'
			return Response(data, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BaseSocialLoginView(SocialLoginView):
	def post(self, request, *args, **kwargs):
		serializer = self.get_serializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		self.login(serializer.validated_data)
		user = self.user
		data = _build_auth_payload(user)
		data['message'] = 'Login successful.'
		return Response(data, status=status.HTTP_200_OK)


class GoogleLogin(BaseSocialLoginView):
	adapter_class = GoogleOAuth2Adapter
	client_class = OAuth2Client


class FacebookLogin(BaseSocialLoginView):
	adapter_class = FacebookOAuth2Adapter
	client_class = OAuth2Client


class MicrosoftLogin(BaseSocialLoginView):
	adapter_class = MicrosoftGraphOAuth2Adapter
	client_class = OAuth2Client
