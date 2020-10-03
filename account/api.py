from .models import CustomUser
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer, LoginSerializer, SignupSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth import login

from knox.models import AuthToken
from knox import views as knox_views

from rest_framework.serializers import ValidationError as SerialValidationError

import logging
from .utils.sign_up import get_uid_token_verify, get_verify_link, get_user_data, activate

logger = logging.getLogger(__name__)


class SignUpAPI(generics.GenericAPIView):
    """
    POST method\n
    REQUEST format {firstName, lastName, email, password}\n
    RESPONSE format {success, user, token, verify_link}
    """
    serializer_class = SignupSerializer

    def post(self, request, *args, **kwargs):
        logger.debug('Receive request sign up\n Data: %s', request.data)
        
        # Tắt reCapcha
        # check_recaptcha(request)

        serializer = self.get_serializer(data=get_user_data(request))
        try:
            serializer.is_valid(raise_exception=True)
        except SerialValidationError as e:
            return Response({
                **e.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.save()
        login(request, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
            "verify_link":  get_verify_link(request, user)
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    """
    POST method\n
    REQUEST format {email, password}\n
    RESPONSE 1 200 {success, user, token}\n
    RESPONSE 2 400 2 {success, errors}\n

    """
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        logger.debug('Receive request log in\n Data: %s', request.data)
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except SerialValidationError as e:
            return Response({
                **e.detail
            }, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.validated_data
        # if AuthToken.objects.filter(user=user).exists():
        #     raise AuthenticationFailed(
        #         detail='Account has been login in. Please logout')
        # login(request, user)
        _, token = AuthToken.objects.create(user)
        login(request, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

# Get User API
class UserAPI(generics.RetrieveAPIView):
    """
    Get User API
    """
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    # def get(self, request):
    #     return Response({
    #         "user": self.get_serializer(request.user).data
    #     })

    def get_object(self):
        return self.request.user


class ActivateAccountAPI(generics.GenericAPIView):
    """
    API Kích hoạt tài khoản bằng email\n
    Se khong tu dang nhap neu thanh cong\n
    ---\n
    GET method\n
    REQUEST format {uid, token}\n
    RESPONESE format {success, err}
    """

    def get(self, request):
        logger.info('Activate Account')
        logger.info(request.data)

        uidb64 = request.GET.get('uid', None)
        token = request.GET.get('token', None)
        code, user = activate(uidb64, token)
        if code < 0:
            msg = 'Activation link is invalid!'
        elif code == 1:
            msg = 'Account already acivated'
        else:
            return Response({})
        #     user = UserSerializer(
        #         user, context=self.get_serializer_context()).data
        return Response({'detail': msg}, status=status.HTTP_400_BAD_REQUEST)
