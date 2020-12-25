from account.models import User
from MartService.models import Cart, CartItem, Category, Order, Payment, Product, ProductModel, Rating, ShipProfile, Shop, TierVariation

from rest_framework import serializers

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class TierVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TierVariation
        fields = [field.name for field in model._meta.fields if field.name != 'product']

class ModelVaritationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductModel
        fields = [field.name for field in model._meta.fields if field.name != 'product']

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = [field.name for field in model._meta.fields if field.name != 'product']

class ProductSerializer(serializers.ModelSerializer):
    # shop = serializers.ReadOnlyField(source = 'user.email')
    shop = ShopSerializer()
    tiervariation_set = TierVariationSerializer(many=True)
    productmodel_set = ModelVaritationSerializer(many=True)
    rating = RatingSerializer()
    class Meta:
        model = Product
        fields = [field.name for field in model._meta.fields] + ['shop', 'rating', 'tiervariation_set', 'productmodel_set']
        
        


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = '__all__'

        
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


