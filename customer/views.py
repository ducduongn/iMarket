from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from .models import Customer, Product
from .permissions import IsOwnerOrReadOnly, IsAuthenticated
from .serializers import CustomerSerializer, ProductSerializer
from .pagination import CustomPagination

class get_post_products(ListCreateAPIView):
    serializer_class = CustomerSerializer
    permission_classes = (IsAuthenticated,)
    pagination_class = CustomPagination
    
    def get_queryset(self):
       products = Product.objects.all()
       return customers

    # Get all products
    def get(self, request):
        products = self.get_queryset()
        paginate_queryset = self.paginate_queryset(products)
        serializer = self.serializer_class(paginate_queryset, many=True)
        return self.get_paginated_response(serializer.data)

    # Create a new product
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

