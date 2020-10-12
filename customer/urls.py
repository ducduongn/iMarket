from rest_framework import routers
from .api import CustomerViewSet, GetPostedProduct

routers = routers.DefaultRouter()
routers.register('api/customer', CustomerViewSet)
# Register thêm GetPostedProduct
routers.register('api/products', GetPostedProduct)

urlpatterns = routers.urls
