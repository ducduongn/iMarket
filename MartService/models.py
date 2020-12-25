from django.db import models
from django.utils.translation import ugettext_lazy as _
from leadmanager.settings import AUTH_USER_MODEL as User

from decimal import Decimal
from django.core.validators import int_list_validator

#--------------------------------Product-----------------------------

class Shop(models.Model):
    shop_name = models.CharField(_("Shop Name"), max_length=100, blank=False)
    class ShopStatus(models.IntegerChoices):
        ACTIVE = 1, 'Actice'
        INACTIVE = 0, 'Inactive'
    shop_status = models.IntegerChoices(default=ShopStatus.INACTIVE, choices=ShopStatus.choices)

class Product(models.Model):
    # ids
    shop = models.ForeignKey("Shop", related_name= 'products',on_delete=models.CASCADE)
    # des info
    name = models.CharField(_('Product name'),max_length=50, blank=False)
    brand = models.ForeignKey(Brand, related_name='product', on_delete=models.CASCADE)

    # numbers
    quantity_in_stock = models.PositiveIntegerField()
    description = models.CharField(_('Description'), max_length=200, blank=False)
    active = models.BooleanField()
    class Meta:
        db_table = "product"
    
    def __str__(self):
        return self.productName


class Rating(models.Model):
    product = models.ForeignKey("Product", verbose_name=_(""), on_delete=models.CASCADE)
    rating = models.FloatField(_("Rating"))
    count1 = models.IntegerField(_("Count 1 star"))
    count2 = models.IntegerField(_("Count 2 star"))
    count3 = models.IntegerField(_("Count 3 star"))
    count4 = models.IntegerField(_("Count 4 star"))
    count5 = models.IntegerField(_("Count 5 star"))

class TierVariation(models.Model):
    #ids
    product = models.ForeignKey("Product", verbose_name=_("Product"), on_delete=models.CASCADE)
    tier_order = models.IntegerField(_("Tier Order"))
    name = models.CharField(_("Tier Name"), max_length=50)
    numopt = models.IntegerField(_("Number of Options"))
    options = models.CharField(_("Options"), max_length=100)
    # black, blue - mau 
    # nhom, nhua - chat lieu

class ProductModel(models.Model):
    # black, nhom
    #ids
    product = models.ForeignKey("Product", verbose_name=_(""), on_delete=models.CASCADE)
    tier_indexs = models.CharField(_("Tier Indexs"), max_length=50, validators=[int_list_validator])

    #prices
    oldprice = models.IntegerField(_("Old Price"))
    price = models.IntegerField(_("Price"))

    #stock
    stock = models.IntegerField(_("Number in Stock"))

class Category(models.Model):
    categoryName = models.CharField(_('Category name'),max_length=50, blank=False)
    description = models.CharField(_('Description'), max_length=200, blank=False)
    products = models.ManyToManyField('Product')

    class Meta:
        db_table = "category"

    def __str__(self):
        return self.categoryName

class Tag(models.Model):
    category = models.ForeignKey(Category, related_name="tags", on_delete=True)
    name = models.CharField(verbose_name="Tag name", max_length=50)
    values = models.CharField(verbose_name="Values", max_length=50)
    products = models.ManyToManyField(Product, through='ProductTag')

class ProductTag(models.Model):
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    value_index = models.PositiveIntegerField(_("value index"))
class Order(models.Model):
    customer = models.ForeignKey(User, related_name= 'orders', null=True, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name= 'orderList', null=True, on_delete=models.CASCADE)

    orderedDate = models.DateTimeField(auto_now_add=True)
    shippedDate = models.DateTimeField(auto_now_add=True)
    requiredDate = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    delivery_method = models.CharField(max_length=30, default='')
    payment_method = models.CharField(max_length=30, default='')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))

    class Meta:
        db_table = "order"

class OrderDetails(models.Model):
    order = models.ForeignKey(Order, related_name= 'orderDetais', on_delete=models.CASCADE)
    product = models.OneToOneField(User,related_name= 'orderDetail', on_delete=models.CASCADE, primary_key= True)
    priceEach = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    quantityOrdered = models.PositiveIntegerField()

    class Meta:
        db_table = "orderDetail"


class Cart(models.Model):
    customer = models.OneToOneField(User, related_name= 'cart', on_delete=models.CASCADE, primary_key=True)

    class Meta:
        db_table = "cart"

class CartItem(models.Model):
    product_model = models.OneToOneField(ProductModel, related_name = 'productmodel', on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, related_name='cartItems', on_delete=models.CASCADE)
    priceEach = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    quantity = models.PositiveIntegerField()