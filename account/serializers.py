import os
from rest_framework import serializers
from .models import User, Car
from django.contrib.auth import get_user_model

from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from django.contrib.auth.models import update_last_login
from rest_framework_jwt.settings import api_settings

import logging

class CarSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = ('name', 'color', 'brand')



logger = logging.getLogger(__name__)


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'is_verified')


# Register Serializer
class SignupSerializer(serializers.ModelSerializer):
    '''Register Account không cần verify email (DEV ONLY)'''
    class Meta:
        model = User
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True}}


    def validate(self, data):
        errors = {}
        if data.get('email') is None:
            errors['email'] = ['Email is none']
        if data.get('password') is None:
            errors['password'] = ['Password name is none']
        elif not errors:
            user = get_user_model().objects.create_user(commit=False, **data)
            try:
                validate_password(data['password'], user=user)
            except ValidationError as e:
                errors['password'] = e.messages
        if errors:
            raise serializers.ValidationError(errors)
        return data

    def create(self, validated_data):
        logger.debug('create user with data: %s', str(validated_data))
        user = get_user_model().objects.create_user(**validated_data)
        # user.is_active = False  # Chưa cho tài khoản này được sử dụng
        user.is_verified = False
        user.save()
        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate_email(self, value):
        """
        Check email is valid
        """
        email = value
        logger.debug('validate email: %s', email)
        if email is None:
            raise serializers.ValidationError("Email data is none")
        elif email == '':
            raise serializers.ValidationError("Email field is empty")
        else:
            if not get_user_model().objects.filter(email=email).exists():
                raise serializers.ValidationError(
                    "User with the email isn't exist")
        return value

    def validate(self, data):
        user = authenticate(**data)
        if user:
            return user
        raise serializers.ValidationError(
            {"password": "Authentication Fail"}, code=401)

# JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
# JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

# class LoginSerializer(serializers.Serializer):

#     email = serializers.CharField(max_length=255)
#     password = serializers.CharField(max_length=128, write_only=True)
#     token = serializers.CharField(max_length=255, read_only=True)

#     def validate(self, data):
#         email = data.get("email", None)
#         password = data.get("password", None)
        
#         user = authenticate(email=email, password=password)
#         if user is None:
#             raise serializers.ValidationError(
#                 'A user with this email and password is not found.'
#             )
#         try:
#             payload = JWT_PAYLOAD_HANDLER(user)
#             jwt_token = JWT_ENCODE_HANDLER(payload)
#             update_last_login(None, user)

#         except User.DoesNotExist:
#             raise serializers.ValidationError(
#                 'User with given email and password does not exists'
#             )
#         return {
#             'email':user.email,
#             'token': jwt_token
#         }