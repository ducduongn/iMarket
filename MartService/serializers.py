from account.models import User
from MartService.models import Brand, Cart, CartItem, Category, Order, Payment, Product, ShipProfile

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
        fields = ['categoryName', 'description', 'products']

        
# --------------------Order----------------------
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        # fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    class Meta:
        model = Cart
        fields = ['create_at']

class ShipProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShipProfile
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    ship_profile = ShipProfileSerializer()
    payment = PaymentSerializer()
    class Meta:
        model = Order
        fields = '__all__'
        

# class OrderSerializer(serializers.ModelSerializer):
#     customer = serializers.ReadOnlyField(source = 'customer.email')
#     owner = serializers.ReadOnlyField(source = 'owner.email')
#     orderDetails = OrderDetailsSerializer(many=True, read_only=True)

#     class Meta:
#         model = Order
#         fields = ['id', 'orderedDate', 'shippedDate', 'requiredDate', 'status', 'delivery_method', 'payment_method', 'total_price','orderDetails']

# class OptionValuesSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Order
#         fields = ['value', 'text']

# class OptionAvailablesSerialzer(serializers.ModelSerializer):
#     optionValues = OptionValuesSerializer(many=True, read_only=True)

#     class Meta:
#         model = Order
#         fields = ['name', 'optionValues']


