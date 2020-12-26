from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from MartService.permission import IsOwnerOrReadOnly

from rest_framework import filters

from MartService.models import Product
from account.models import User 
from MartService.serializers import CartSerializer
from django.http import JsonResponse

import MartService.serializers as MartSerializer

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'

class ProductView(generics.ListCreateAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    http_method_names = ['get', 'post', "update"]

    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.all()

    def get_detail(self, request, pk):
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return JsonResponse({
                'message': 'Create a new Product successful!'
            }, status=status.HTTP_201_CREATED)

        return JsonResponse({
            'message': 'Create a new Product unsuccessful!'
        }, sta