from rest_framework import generics, viewsets, permissions

from MartService.models import Category
from MartService.serializers import CategorySerializer
from MartService.filters import CategoryFilter

class CategoryList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    # authentication_classes []
    serializer_class = CategorySerializer
    filterset_class = CategoryFilter


    queryset = Category.objects.all()
    

    # def get_queryset(self):
    #     return queryset