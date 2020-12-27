from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from MartService.permission import IsOwnerOrReadOnly

from rest_framework import filters

from MartService.models import Cart, ProductModel, CartItem
from account.models import User 
from MartService.serializers import CartItemSerializer
from django.http import JsonResponse

import MartService.serializers as MartSerializer

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'

class CartItemList(generics.ListCreateAPIView):
    # permission_classes = [IsOwnerOrReadOnly]
    # authentication_classes = []

    serializer_class = CartItemSerializer

    queryset = CartItem.objects.all()

class CartItemDetail(generics.RetrieveAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

class CartItemCreate(generics.CreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer

class CartItemRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # def perform_update(self, serializer):
    #     serializer.save(user=self.request.user.id)

class CartItemDestroy(generics.RetrieveDestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class = CartItemSerializer