from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions, generics, status, authentication
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from MartService.permission import IsOwnerOrReadOnly


from rest_framework import filters

from MartService.models import Cart, ProductModel, CartItem
from account.models import User 
from MartService.serializers import  ShoppingCartSerializer

from django.http import JsonResponse

from knox.auth import TokenAuthentication
import MartService.serializers as MartSerializer

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'

class CartList(generics.ListCreateAPIView):
    # permission_classes = [IsOwnerOrReadOnly]
    # authentication_classes = []

    serializer_class = ShoppingCartSerializer

    queryset = Cart.objects.all()

class CartDetail(generics.RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = ShoppingCartSerializer

class CartCreate(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = ShoppingCartSerializer

class CartRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = ShoppingCartSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # def perform_update(self, serializer):
    #     serializer.save(user=self.request.user.id)

class CartDestroy(generics.RetrieveDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = ShoppingCartSerializer

# class ShoppingCartView(generics.CreateAPIView):
#     permission_classes = (IsAuthenticated, IsOwnerOrReadOnly)
#     authentication_classes = (TokenAuthentication, authentication.SessionAuthentication)

#     serializer_class = ShoppingCartSerializer

#     # def perform_create(self, serializer):
#     #     cart = serializer.save()
#     #     cartitems = CartItem()

#     # def perform_create(self, serializer):
#     #     shop_cart = serializer.save()

#     # def perform_destroy(self, instance):
#     #     goods = instance.goods
#     #     goods.goods_num += instance.nums
#     #     goods.save()

#     #     instance.delete()

#     # def perform_update(self, serializer):
#     #     existed_record = ShoppingCart.objects.get(id=serializer.instance.id)
#     #     existed_nums = existed_record.nums
   
#     #     saved_record = serializer.save()

#     #     nums = saved_record.nums - existed_nums
#     #     goods = saved_record.goods
#     #     goods.goods_num -= nums
#     #     goods.save()

#     def get_serializer_class(self):
#         if self.action == 'list':
#             return ShopCartDetailSerializer
#         else:
#             return ShopCartSerializer

    def get_queryset(self):
        return ShoppingCart.objects.filter(user=self.request.user)

