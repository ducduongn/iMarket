from rest_framework import generics, viewsets, permissions

from MartService.models import Category
from MartService.serializers import CategorySerializer
from MartService.filters import CategoryFilter

class CategoryList(generics.ListCreateAPIView):
    permission_classes = [permissions.AllowAny]
    # authentication_classes []
    serializer_class = CategorySerializer
    filterset_class = CategoryFilter


    queryset = Category.objects.all()
    
class CategoryDetail(generics.RetrieveUpdateAPIView):
    # permission_classes = [IsStaffOrTargetUser]
    # authentication_classes = [TokenAuthentication, ]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer