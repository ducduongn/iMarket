from account.models import User
from MartService.models import Cart, CartItem, Category, Order, Payment, Product, ProductModel, Rating, ShipProfile, Shop, TierVariation
from MartService import fields
from rest_framework import serializers

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class TierVariationSerializer(serializers.ModelSerializer):
    options = fields.StringSplitArrayField()
    class Meta:
        model = TierVariation
        fields = [field.name for field in model._meta.fields if field.name != 'product']

class ModelVaritationSerializer(serializers.ModelSerializer):
    tier_index = fields.StringSplitArrayField(transform_func=int)
    class Meta:
        model = ProductModel
        fields = [field.name for field in model._meta.fields if field.name != 'product']

class RatingSerializer(serializers.ModelSerializer):
    rating_count = serializers.SerializerMethodField()
    class Meta:
        model = Rating
        fields = ['rating_star', 'rating_count']

    def get_rating_count(self, obj):
        return [obj.count1, obj.count2, obj.count3, obj.count4, obj.count5]

class ProductSerializer(serializers.ModelSerializer):
    # shop = serializers.ReadOnlyField(source = 'user.email')
    shop = ShopSerializer()
    variations = TierVariationSerializer(many=True)
    models = ModelVaritationSerializer(many=True)
    min_max_price = serializers.SerializerMethodField()
    
    rating = RatingSerializer()

    class Meta:
        model = Product
        fields = [field.name for field in model._meta.fields] + ['shop', 'rating', 'variations', 'models', 'min_max_price' ]
    
    def get_min_max_price(self, object):
    
        prices = [pm.price for pm in object.models.all()]
        return [min(prices) , max(prices)]
    



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [field.name for field in model._meta.fields if field.name != 'product']

        
# --------------------Order----------------------
class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = [field.name for field in model._meta.fields]

class ShoppingCartSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(
        default=serializers.CurrentUserDefault()
    )
             
    cartitems = CartItemSerializer(many=True, read_only=True)

    def create(self, validated_data, nums):
        user = self.context["request"].user
        cart_item = CartItem()
        cart_item.product_model = validated_data
        cart_item.unit_price = validated_data["price"]
        cart_item.quantity = nums

        existed = Cart.objects.filter(user=user)

        if existed:
            existed = existed[0]
            existed.cartItems.append(cart_item) 
            existed.save()
        else:
            existed = Cart.objects.create(customer=user)

        return existed

    def update(self, instance, validated_data):

        instance.cartItems = validated_data["cartitems"]
        instance.save()
        return instance
    class Meta:
        model = Cart
        fields = [field.name for field in model._meta.fields] + ['cartitems', 'user']

# class CartSerializer(serializers.ModelSerializer):
#     items = CartItemSerializer(many=True, read_only=True)
    

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


