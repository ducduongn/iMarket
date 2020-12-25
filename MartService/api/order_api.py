from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

from rest_framework import filters

from MartService.models import Order
from account.models import User 

import MartService.serializers as MartSerializer

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'

class OrderView(generics.GenericAPIView):

    def api_detail_order_view(self, request, orderName):
        try:
            order = Order.objects.get(orderName=orderName)
        except Order.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'GET':
            serializer = MartSerializer.OrderSerializer(Order)
            return Response(serializer.data)
    
    def api_update_order_view(self, request, orderName):
        try:
            order = Order.objects.get(orderName=orderName)
        except Order.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'PUT':
            serializer = MartSerializer.OrderSerializer(order, data=request.data)
            data = {}
            if serializer.is_valid():
                serializer.save()
                data[SUCCESS] = UPDATE_SUCCESS
                return Response(data=data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def api_delete_order_view(self, request, orderName):
        try:
            order = Order.objects.get(orderName=orderName)
        except Order.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == 'DELETE':
            operation = order.delete()
            data = {}
            if operation:
                data[SUCCESS] = DELETE_SUCCESS
            return Response(data=data)
    
    def api_post_order_view(self, request):
        owner = User.objects.get(pk=1)

        order = Order(owner=owner)

        if request.method == 'POST':
            serializer = MartSerializer.OrderSerializer(order, data=request.data)
            data = {}
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderList(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    
    def list(self, request, *arg, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = MartSerializer.OrderSerializer(queryset, many=True)
        return Response(serializer.data) 
    
    def get_queryset(self):
        owner = self.request.owner
        return Order.objects.filter(owner=owner)

# class OrderSearchList(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = MartSerializer.OrderSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = []



    