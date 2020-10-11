from rest_framework import serializers
from customer.models import Customer
from customer.models import Product
from django.contrib.auth.models import User


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):  # create class to serializer model
    creator = serializers.ReadOnlyField(source='creator.username')

    class Meta:
        product = Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):  # create class to serializer usermodel
    movies = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'products')