from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, GenericAPIView, ListAPIView

from .models import Customer, Product, Category
from .permissions import IsOwnerOrReadOnly, IsAuthenticated
from .serializers import CustomerSerializer, ProductSerializer, CategorySerializer
from .pagination import CustomPagination
from .filters import CategoryFilter, ProductFilter

# Customer Viewset

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = CustomerSerializer


# Được chuyển từ view.py
class GetPostedProduct(ListCreateAPIView):
    '''Trả về danh sách tất cả các Product, có phân trang.'''

    serializer_class = ProductSerializer
    # permission_classes = (IsAuthenticated,)
    pagination_class = CustomPagination

    def get_queryset(self):
        products = Product.objects.all()
        # return customers | Dòng này bị lỗi ?
        return products

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

class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    filterset_class = CategoryFilter

class ProductView(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = CustomPagination
    queryset = Product.objects.all()
    filterset_class = ProductFilter

    def get(self, request):
        products = self.filter_queryset(self.get_queryset())
        paginate_queryset = self.paginate_queryset(products)
        serializer = self.serializer_class(paginate_queryset, many=True)
        return self.get_paginated_response(serializer.data)