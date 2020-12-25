from .models import User, Car

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import CarSerializer, UserSerializer, LoginSerializer, SignupSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth import login

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from knox.models import AuthToken
from knox import views as knox_views
from knox.auth import TokenAuthentication


from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.serializers import ValidationError as SerialValidationError
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

import logging
from .utils.sign_up import get_uid_token_verify, get_verify_link, get_user_data, activate

logger = logging.getLogger(__name__)
# from .utils.sign_up import get_uid_token_verify, get_verify_link, get_user_data, activate


class ListCreateCarView(ListCreateAPIView):
    model = Car
    serializer_class = CarSerializer

    def get_queryset(self):
        return Car.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = CarSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Create a new Car successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new Car unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)


class UpdateDeleteCarView(RetrieveUpdateDestroyAPIView):
    model = Car
    serializer_class = CarSerializer

    def put(self, request, *args, **kwargs):
        car = get_object_or_404(Car, id=kwargs.get('pk'))
        serializer = CarSerializer(car, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Update Car successful!'
            }, status=status.HTTP_200_OK)

        return JsonResponse({
            'message': 'Update Car unsuccessful!'
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        car = get_object_or_404(Car, id=kwargs.get('pk'))
        car.delete()

        return JsonResponse({
            'message': 'Delete Car successful!'
        }, status=status.HTTP_200_OK)

class UserList(generics.ListCreateAPIView):
    # permission_classes = (IsAuthenticatedOrWriteOnly,)
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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
        _, token = AuthToken.objects.create(user=request.user)
        login(request, user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

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

# Get User API

class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = (AllowAny,)
    queryset = User.objects.all().order_by('-created')
    serializer_class = UserSerializer
 
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        auth_token = AuthToken.objects.create(user)
        # print(auth_token)
        return Response(
            {
                "email": user.email,
                "token": auth_token,
                "id": user.id,
                #"key": auth_token.key,
            }
        )