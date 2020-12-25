from django.db import models
from django.utils.translation import ugettext_lazy as _
from leadmanager.settings import AUTH_USER_MODEL as User

from decimal import Decimal
from django.core.validators import int_list_validator

class Shop(models.Model):
    shopname = models.CharField(_("Shop Name"), max_length=100, blank=False)

class Brand(models.Model):
    companyName = models.CharField(_('Company name'),max_length=50, blank=False)
    description = models.CharField(_('Description'), max_length=200, blank=False)
    address = models.CharField(max_length=140, null=False)
    country = models.CharField(max_length=50, null= False)

    class Meta:
        db_table = "brand"

    def __str__(self):
        return self.companyName

class Product(models.Model):
    # ids
    shopid = models.ForeignKey("Shop", related_name= 'products',on_delete=models.CASCADE)
    # des info
    name = models.CharField(_('Product name'),max_length=50, blank=False)
    brand = models.ForeignKey(Brand, related_name='product', on_delete=models.CASCADE)

    # numbers
    quantityInStock = models.PositiveIntegerField()
    description = models.CharField(_('Description'), max_length=200, blank=False)
    class Meta:
        db_table = "product"
    
    def __str__(self):
        return self.productName

class Rating(models.Model):
    itemid = models.ForeignKey("Product", verbose_name=_(""), on_delete=models.CASCADE)
    rating = models.FloatField(_("Rrating"))
    count1 = models.IntegerField(_("Count 1 star"))
    count2 = models.IntegerField(_("Count 2 star"))
    count3 = models.IntegerField(_("Count 3 star"))
    count4 = models.IntegerField(_("Count 4 star"))
    count5 = models.IntegerField(_("Count 5 star"))

class TierVariation(models.Model):
    #ids
    itemid = models.ForeignKey("Product", verbose_name=_("Product"), on_delete=models.CASCADE)
    tier_order = models.IntegerField(_("Tier Order"))
    name = models.CharField(_("Tier Name"), max_length=50)
    numopt = models.IntegerField(_("Number of Options"))
    options = models.CharField(_("Options"), max_length=100)
    # black, blue - mau 
    # nhom, nhua - chat lieu
class ProductModel(models.Model):
    # black, nhom
    #ids
    itemid = models.ForeignKey("Product", verbose_name=_(""), on_delete=models.CASCADE)
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


class OptionAvailables(models.Model):
    name = models.CharField(_('Category Name'),max_length=50, null=False)
    
    class Meta:
        db_table = "optionAvailables"

class OptionValues(models.Model):
    value = models.CharField(_('Value'),max_length=50, blank=False)
    text = models.CharField(_('Text'),max_length=60, blank=False)
    optionAvailables = models.ForeignKey(OptionAvailables, related_name='optionValues',on_delete=models.CASCADE)

    class Meta:
        db_table = "optionValues"

class Cart(models.Model):
    customer = models.OneToOneField(User, related_name= 'cart', on_delete=models.CASCADE, primary_key=True)

    class Meta:
        db_table = "cart"

class CartItem(models.Model):
    product_model = models.OneToOneField(ProductModel, related_name = 'productmodel', on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, related_name='cartItems', on_delete=models.CASCADE)
    priceEach = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    quantity = models.PositiveIntegerField()