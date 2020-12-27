from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from MartService.permission import IsOwnerOrReadOnly

from rest_framework import filters

from MartService.models import Cart, ProductModel, CartItem
from account.models import User 
from MartService.serializers import CartSerializer
from django.http import JsonResponse

import MartService.serializers as MartSerializer

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'

class CartList(generics.ListCreateAPIView):
    # permission_classes = [IsOwnerOrReadOnly]
    # authentication_classes = []

    serializer_class = CartSerializer

    queryset = Cart.objects.all()

class CartDetail(generics.RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartCreate(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class CartRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # def perform_update(self, serializer):
    #     serializer.save(user=self.request.user.id)

class CartDestroy(generics.RetrieveDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer