from rest_framework import routers
from .api import CustomerViewSet

routers = routers.DefaultRouter()
routers.register('api/customer', CustomerViewSet, )

urlpatterns =routers.urls