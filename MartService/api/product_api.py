from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from MartService.permission import IsOwnerOrReadOnly

from rest_framework import filters

from MartService.models import Product
from account.models import User 
from MartService.serializers import ProductSerializer
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
        }, status=status.HTTP_400_BAD_REQUEST)
    

    
    # def api_update_product_view(self, request, productName):
    #     try:
    #         product = Product.objects.get(productName=productName)
    #     except Product.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)

    #     if request.method == 'PUT':
    #         serializer = MartSerializer.ProductSerializer(product, data=request.data)
    #         data = {}
    #         if serializer.is_valid():
    #             serializer.save()
    #             data[SUCCESS] = UPDATE_SUCCESS
    #             return Response(data=data)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def api_delete_product_view(self, request, productName):
    #     try:
    #         product = Product.objects.get(productName=productName)
    #     except Product.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)

    #     if request.method == 'DELETE':
    #         operation = product.delete()
    #         data = {}
    #         if operation:
    #             data[SUCCESS] = DELETE_SUCCESS
    #         return Response(data=data)
    
    # def api_post_product_view(self, request):
    #     owner = User.objects.get(pk=1)

    #     product = Product(owner=owner)

    #     if request.method == 'POST':
    #         serializer = MartSerializer.ProductSerializer(product, data=request.data)
    #         data = {}
    #         if serializer.is_valid():
    #             serializer.save()
    #             return Response(serializer.data, status=status.HTTP_201_CREATED)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductList(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    
    def list(self, request, *arg, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = MartSerializer.ProductSerializer(queryset, many=True)
        return Response(serializer.data) 
    
    def get_queryset(self):
        owner = self.request.owner
        return Product.objects.filter(owner=owner)

class ProductSearchList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = MartSerializer.ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['productName', 'brand', 'category']



    