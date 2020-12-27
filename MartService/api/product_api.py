from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions, generics, status
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

class ProductList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]

    queryset = Product.objects.all()
    # permission_classes = [IsOwnerOrReadOnly]

    serializer_class = ProductSerializer
    
    filter_backends = [SearchFilter, OrderingFilter, ProductFilter]
    search_fields = ['id', 'name', 'brand', 'shop__name']
    ordering_fields = ['name', 'brand', "ctime"]

    
    # def get_queryset(self, request):
    #     return self.queryset

    # def get_object(self, request):
    #     product_id = self.kwargs['pk']
    #     return self.get_queryset().filter(id=id)

    # def retrieve(self, request, *args, **kwargs):
    #     try:
    #         instance = self.get_object()
    #     except (Product.DoesNotExist, KeyError):
    #         return Response({"error": "Requested Product does not exist"}, status=status.HTTP_404_NOT_FOUND)
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset    = self.get_queryset()
        serializer  = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

# class ProductDetail(generics.RetrieveAPIView):
#     permission_classes = [permissions.AllowAny]

#     queryset = Product.objects.all()
#     # permission_classes = [IsOwnerOrReadOnly]

#     serializer_class = ProductSerializer
    
#     filter_backends = [SearchFilter, OrderingFilter]
#     search_fields = ['name', 'brand', 'shop__name']
    # ordering_fields = ['name', 'brand', "ctime"]

class ProductDetail(generics.RetrieveUpdateAPIView):
    # permission_classes = [IsStaffOrTargetUser]
    # authentication_classes = [TokenAuthentication, ]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


    




    