from account.models import User
from MartService.models import Product, Category, Order, OrderDetails, Cart, Brand

from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.email')

    class Meta:
        model = Product
        fields = ['productName', 'description', 'price', 'brand', 'gift', 'numRating', 'comparePrice']


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'

class OrderDetailsSerializer(serializers.ModelSerializer):
     class Meta:
        model = OrderDetails
        fields = ['product', 'priceEach', 'quantityOrdered']
        

class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.ReadOnlyField(source = 'customer.email')
    owner = serializers.ReadOnlyField(source = 'owner.email')
    orderDetails = OrderDetailsSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'orderedDate', 'shippedDate', 'requiredDate', 'status', 'delivery_method', 'payment_method', 'total_price','orderDetails']

class OptionValuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['value', 'text']

class OptionAvailablesSerialzer(serializers.ModelSerializer):
    optionValues = OptionValuesSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['name', 'optionValues']


