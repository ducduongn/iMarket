from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers

from knox import views as knox_views

from .api.product_api import ProductList, ProductDetail
from .api.order_api import OrderView, OrderList

app_name = 'api_mart_service'

# router = routers.DefaultRouter()
# router.register(r'products', ProductView)
# router.register(r'products/list', ProductList)
# router.register(r'products/search', ProductSearchList)

# router.register(r'orders', OrderView)
# router.register(r'orders/list', OrderList)


# router.register(r'userDetails', views.DisciplineViewSet, 'disciplines')

urlpatterns = [
    # url(r'^', include(router.urls)),
    path('products/', ProductList.as_view(), name="products"),
    path('products/<int:pk>/', ProductDetail.as_view()),
    # url(r'^products/$', ProductList.as_view()),
    # url(r'^products/(?P&lt;pk&gt;[0-9]+)/$', ProductList.as_view()),
    # path('products/?search=[search_field]/', ProductView.as_view()),
    # path('products/product-list/', ProductList.as_view(), name="product-list"),
    path('orders/', OrderView.as_view(), name="orders"),
    path('orders/order-list/', OrderList.as_view(), name="order-list"),
]
