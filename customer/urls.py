from rest_framework import routers
from .api import CustomerViewSet, GetPostedProduct
from django.urls import path

routers = routers.DefaultRouter()
routers.register('api/customer', CustomerViewSet)
# Register thêm GetPostedProduct

urlpatterns = routers.urls + [path('api/products', GetPostedProduct.as_view())]
