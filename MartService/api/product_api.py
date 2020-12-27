from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions, generics, status, pagination
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.filters import SearchFilter, OrderingFilter

from MartService.permission import IsOwnerOrReadOnly


from rest_framework import filters

from MartService.multiplelookup import MultipleFieldLookupMixin
from MartService.permission import IsStaffOrTargetUser
from MartService.models import Product
from account.models import User 
from MartService.serializers import ProductSerializer
from django.http import JsonResponse

import MartService.serializers as MartSerializer

from knox.auth import TokenAuthentication

from MartService.filters import ProductFilter

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'

class SetPagination(pagination.LimitOffsetPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10

class ProductList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name', 'brand', 'shop__name']
    ordering_fields = ['name', 'brand', "ctime"]
  
    queryset = Product.objects.all()

class ProductDetail(generics.RetrieveAPIView):
    # permission_classes = [IsStaffOrTargetUser]
    # authentication_classes = [TokenAuthentication, ]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdate(generics.RetrieveUpdateAPIView):
    # permission_classes = [IsStaffOrTargetUser]
    # authentication_classes = [TokenAuthentication, ]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    




    