from django.db import models
from django.utils.translation import ugettext_lazy as _
from leadmanager.settings import AUTH_USER_MODEL as User
from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField
from decimal import Decimal
from django.core.validators import int_list_validator
from django.contrib.auth import get_user_model

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

# ----------------------------Order----------------------------
class Cart(models.Model):
    customer = models.OneToOneField(User, related_name= 'cart', on_delete=models.CASCADE, primary_key=True)
    created_at = models.DateField(_("Created at"), auto_now=True, auto_now_add=True)
    class Meta:
        db_table = "cart"

class CartItem(models.Model):
    product_model = models.OneToOneField(ProductModel, related_name = 'productmodel', on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, related_name='cartItems', on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey("Order", verbose_name=_("In order"), on_delete=models.CASCADE, null=True)
    old_unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    quantity = models.PositiveIntegerField()

class ShipProfile(models.Model):
    customer = models.ForeignKey(get_user_model(), verbose_name=_(""), on_delete=models.CASCADE)
    firstname = models.CharField(_("First Name"), max_length=50)
    lastname = models.CharField(_("Last Name"), max_length=50)
    address = models.CharField(_("Address"), max_length=50)
    phonenumber = models.PhoneNumberField(_("Phone number"))

class Payment(models.Model):
    name = models.CharField(_("Name on card"), max_length=50)
    cc_number = CardNumberField(_('Card number'))
    cc_expiry = CardExpiryField(_('Expiration date'))
    cc_code = SecurityCodeField(_('Security code'))

class Order(models.Model):
    shop = models.ForeignKey("Shop", related_name= 'orderList', null=True, on_delete=models.CASCADE)
    ship_profile = models.ForeignKey("ShipProfile", related_name='orders', null=True, on_delete=models.CASCADE)
    
    # Payment
    class PaymentMethod(models.IntegerChoices):
        BANK = 1, _('Transfer')
        COD = 2, _('COD')
    payment_method = models.SmallIntegerField(verbose_name=_(
        'Payment Method'), choices=PaymentMethod.choices)
    payment = models.ForeignKey("Payment", verbose_name=_("Payment Profile"), on_delete=models.CASCADE)

    # Date
    ordered_date = models.DateTimeField(auto_now_add=True)
    confirmed_date = models.DateField(_("Confirm Date"), auto_now=False, auto_now_add=False, null=True)
    shippedDate = models.DateTimeField(_("Shipped Date"), auto_now=False, auto_now_add=False, null=True)

    # Status
    class Status(models.IntegerChoices):
        NEW = 1, _('Just create')
        CONFIRMED = 2, _('confirmed/deposited')
        SHIPING = 3
        COMPLETED = 0

        SHOP_UNCONFIRMED = -1 # Shop không confirm
        CANCELED_BEFORE_CONFIRM = -2 # Cancel trước khi shop confirm
        CANCELED_AFTER_CONFIRM = -3 # Cancel sau khi shop confirm
        NOSHOW = -3 # Khách không nhận
    status = models.SmallIntegerField(_("Status"), choices=Status.choices)
    
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))

    class Meta:
        db_table = "order"

