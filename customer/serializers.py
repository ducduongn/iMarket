from rest_framework import serializers
from customer.models import Customer
from customer.models import Product
# from django.contrib.auth.models import User | Không dùng "User" để lấy model, dùng get_user_model
from django.contrib.auth import get_user_model


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


# create class to serializer model
class ProductSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        model = Product
        fields = '__all__'


# create class to serializer usermodel
class UserSerializer(serializers.ModelSerializer):
    # movies?
    # movies = serializers.PrimaryKeyRelatedField(
    #     many=True, queryset=Product.objects.all())
    # Tạm đổi thành
    products = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Product.objects.all())  # Sao lại all?

    class Meta:
        # model = User
        model = get_user_model()
        fields = ('id', 'username', 'products')
