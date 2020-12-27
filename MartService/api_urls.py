from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers

from knox import views as knox_views

from .api.product_api import (
    ProductList, 
    ProductDetail,
    ProductRetrieveUpdate
)

from .api.cate_api import (
    CategoryList, 
    CategoryDetail
)
from .api.order_api import (
    OrderView, 
    OrderList
)

from .api.cart_api import (
    CartCreate, 
    CartDetail, 
    CartList, 
    CartRetrieveUpdate,
    CartDestroy
)

from .api.cart_item_api import (
    CartItemList,
    CartItemDetail,
    CartItemCreate,
    CartItemDestroy,
    CartItemRetrieveUpdate
)

app_name = 'api_mart_service'

urlpatterns = [
    path('products/', ProductList.as_view(), name="products"),
    path('products/<int:pk>/', ProductDetail.as_view()),
    path('products/<int:pk>/update/', ProductRetrieveUpdate.as_view(), name='update-product'),

    # Category
    path('category/', CategoryList.as_view(), name="products"),
    path('category/<int:pk>/', CategoryDetail.as_view()),
    path('orders/', OrderView.as_view(), name="orders"),
    path('orders/order-list/', OrderList.as_view(), name="order-list"),

    # Cart
    path('cart/', CartList.as_view(), name='list-carts'),
    path('cart/create/', CartCreate.as_view(), name='create-cart'),
    path('cart/<int:pk>/', CartDetail.as_view(), name='detail-cart'),
    path('cart/<int:pk>/update/', CartRetrieveUpdate.as_view(), name='update-cart'),
    path('cart/<int:pk>/delete/', CartDestroy.as_view(), name='delete-cart'),

   # CartItems
    path('cartitem/', CartList.as_view(), name='list-cartitems'),
    path('cartitem/create/', CartCreate.as_view(), name='create-cartitems'),
    path('cartitem/<int:pk>/', CartDetail.as_view(), name='detail-cartitems'),
    path('cartitem/<int:pk>/update/', CartRetrieveUpdate.as_view(), name='update-cartitems'),
    path('cartitem/<int:pk>/delete/', CartDestroy.as_view(), name='delete-cartitems'),

    #Order

]
