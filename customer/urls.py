from rest_framework import routers
from .api import CustomerViewSet, GetPostedProduct, ProductView, CategoryListView
from django.urls import path

routers = routers.DefaultRouter()
routers.register('api/customer', CustomerViewSet)
# Register thêm GetPostedProduct

urlpatterns = routers.urls + [
    path('api/products', GetPostedProduct.as_view()),
    path('api/tproducts', ProductView.as_view()),
    path('api/category', CategoryListView.as_view()),

    ]
