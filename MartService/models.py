from django.db import models
from django.utils.translation import ugettext_lazy as _
from leadmanager.settings import AUTH_USER_MODEL as User
from creditcards.models import CardNumberField, CardExpiryField, SecurityCodeField
from decimal import Decimal
from django.core.validators import int_list_validator
from django.contrib.auth import get_user_model
from django_unixdatetimefield import UnixDateTimeField
from phonenumber_field.modelfields import PhoneNumberField
from .storage import DontCreateIfExistStorage
from datetime import datetime
# --------------------------------Product-----------------------------


class Shop(models.Model):
    shopid = models.AutoField(primary_key=True)
    ctime = UnixDateTimeField(_("Created at"), auto_now_add=True)
    name = models.CharField(_("Shop Name"), max_length=100, blank=False)

    class ShopStatus(models.IntegerChoices):
        ACTIVE = 1, 'Actice'
        INACTIVE = 0, 'Inactive'
    status = models.SmallIntegerField(
        default=ShopStatus.INACTIVE, choices=ShopStatus.choices)
    description = models.CharField(_("Description"), max_length=300, null=True)
    rating_star = models.FloatField(_("Rating"))

    @classmethod
    def spcreate(cls, *args, **kwargs):
        shopid = kwargs['shopid']
        name = kwargs['name']
        description = kwargs['description']
        # rating_good = kwargs['rating_good']
        ctime = datetime.utcfromtimestamp(int(kwargs['ctime'])) 
        rating_star = kwargs['rating_star']
        return cls(pk=shopid, name=name, status=1, rating_star=rating_star, description=description, ctime=ctime)

    def __str__(self):
        return self.name


class Product(models.Model):
    # ids
    itemid = models.AutoField(primary_key=True)
    shop = models.ForeignKey(
        "Shop", related_name='products', on_delete=models.CASCADE)
    # des info
    name = models.CharField(_('Product name'), max_length=50, blank=False)
    brand = models.CharField(_("Brand"), max_length=50, null=True)
    category = models.ForeignKey("Category", verbose_name=_(
        "Category"), related_name='products', on_delete=models.SET_NULL, null=True)
    description = models.CharField(
        _('Description'), max_length=500, blank=False)
    active = models.BooleanField()
    # numbers
    stock = models.PositiveIntegerField()

    ctime = UnixDateTimeField(_("Created at"), auto_now_add=True)
    uptime = models.DateField(_("Updated at"), auto_now=True)

    stock = models.IntegerField(_("Number in Stock"))
    oldprice = models.IntegerField(_("Price before discount"))
    # dev only
    image = models.ImageField(
        _("Overview Image"), upload_to='images/', storage=DontCreateIfExistStorage(), default="")
    rating = models.OneToOneField("Rating", on_delete=models.CASCADE)

    class Meta:
        db_table = "product"

    def __str__(self):
        return self.name

    @classmethod
    def spcreate(cls, shop, rating, *args, **d):
        itemid = d['itemid']
        catid = next(filter(lambda x: x['no_sub'], d['categories']))['catid']
        pparam = {
            "shop": shop,
            "name": d['name'],
            "brand": d['brand'],
            "category": Category.objects.get(pk=catid),
            "description": d['description'],
            "active": True,
            "ctime":datetime.utcfromtimestamp(int(d['ctime'])),
            "oldprice": d['price_before_discount'] / 10000,
            "stock": d['stock'],
            "rating": rating
        }
        return cls(pk=itemid, **pparam)


class ProductImage():
    product = models.ForeignKey("Product", verbose_name=_(
        "Product Images"), related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(_("Image"), upload_to='images/')


class Rating(models.Model):
    rating_star = models.FloatField(_("Rating"))
    count1 = models.IntegerField(_("Count 1 star"))
    count2 = models.IntegerField(_("Count 2 star"))
    count3 = models.IntegerField(_("Count 3 star"))
    count4 = models.IntegerField(_("Count 4 star"))
    count5 = models.IntegerField(_("Count 5 star"))

    @classmethod
    def spcreate(cls, **drating):
        drating_count = drating['rating_count']
        rating_params = {
            "rating_star": drating['rating_star'],
            'count1': drating_count[0],
            'count2': drating_count[1],
            'count3': drating_count[2],
            'count4': drating_count[3],
            'count5': drating_count[4],
        }
        return cls(**rating_params)


class TierVariation(models.Model):
    # ids
    product = models.ForeignKey("Product", verbose_name=_(
        "Product"), related_name="variations", on_delete=models.CASCADE)
    order_in_tier = models.IntegerField(_("Tier Order"))
    name = models.CharField(_("Tier Name"), max_length=50)
    numopt = models.IntegerField(_("Number of Options"))
    options = models.CharField(_("Options"), max_length=100)

    class Meta:
        unique_together = ('product', 'order_in_tier')

    @classmethod
    def spcreate(cls, i, product, *args, **kwargs):
        options = kwargs['options']
        if len(options) <= 0 or (len(options) == 1 and options[0] == ""):
            return None
        t_param = {
            "name": kwargs['name'],
            "options": ','.join(options),
            "order_in_tier": i,
            "numopt": len(options),
        }
        return cls(product=product, **t_param)


class ProductModel(models.Model):
    # black, nhom
    # ids
    modelid = models.AutoField(primary_key=True)
    product = models.ForeignKey("Product", verbose_name=_(
        "Product Model"), related_name="models", on_delete=models.CASCADE)
    tier_index = models.CharField(
        _("Tier Index"), max_length=50, validators=[int_list_validator])

    # prices
    # oldprice = models.IntegerField(_("Old Price"))
    price = models.IntegerField(_("Price"))

    # stock
    stock = models.IntegerField(_("Number in Stock"))
    sold = models.IntegerField(_("Sold"))

    @classmethod
    def spcreate(cls, pk, product, *args, **kwargs):
        m_param = {
            "product": product,
            "tier_index": ','.join([str(i) for i in kwargs['extinfo']['tier_index']]),
            "price": kwargs['price'] / 10000,
            "stock": kwargs['stock'],
            'sold': kwargs['sold'],
        }
        return cls(pk=pk, **m_param)


class Category(models.Model):
    catid = models.AutoField(primary_key=True, default="")
    name = models.CharField(_('Category Name'), max_length=50, default="")
    description = models.CharField(
        _('Description'), max_length=200, blank=True)
    parent = models.ForeignKey('Category', verbose_name=_(
        'Parent Category'), null=True, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'parent')

    def __str__(self):
        return self.name

    @classmethod
    def spcreate(cls, *args, **kwargs):
        name = kwargs['name'].lower()
        if 'catid_parent' in kwargs and kwargs['catid_parent'] is not None:
            parent = cls.objects.get(pk=kwargs['catid_parent'])
            return cls(*args, pk=kwargs['pk'], name=name, parent=parent)
        else:
            return cls(*args, pk=kwargs['pk'], name=name)


class Tag(models.Model):
    category = models.ForeignKey(
        Category, related_name ="tags", on_delete=models.CASCADE)
    name = models.CharField(verbose_name="Tag name", max_length=50)
    values = models.CharField(verbose_name="Values", max_length=50)
    products = models.ManyToManyField(Product, through='ProductTag')


class ProductTag(models.Model):
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    value_index = models.PositiveIntegerField(_("value index"))

# ----------------------------Order--------------------------- 

class Cart(models.Model):
    customer = models.OneToOneField(
        User, related_name='cart', on_delete=models.CASCADE, primary_key=True)
    ctime = models.DateField(_("Created at"), auto_now=True)
    uptime = models.DateField(_("Updated at"), auto_now=True)
    # total_price = models.DecimalField(
    #     max_digits=10, decimal_places=2, default=Decimal('0.00'))

    class Meta:
        db_table = "cart"


class CartItem(models.Model):
    product_model = models.OneToOneField(
        ProductModel, related_name='productmodel', on_delete=models.CASCADE)
    cart = models.ForeignKey(
        Cart, related_name='cartItems', on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey("Order", verbose_name=_(
        "In order"), on_delete=models.CASCADE, null=True)
    old_unit_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=Decimal('0.00'))
    unit_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=Decimal('0.00'))
    quantity = models.PositiveIntegerField()


class ShipProfile(models.Model):
    customer = models.ForeignKey(get_user_model(), verbose_name=_(
        "Ship Profile"), on_delete=models.CASCADE)
    firstname = models.CharField(_("First Name"), max_length=50)
    lastname = models.CharField(_("Last Name"), max_length=50)
    address = models.CharField(_("Address"), max_length=50)
    phonenumber = PhoneNumberField(_("Phone number"))


class Payment(models.Model):
    name = models.CharField(_("Name on card"), max_length=50)
    cc_number = CardNumberField(_('Card number'))
    cc_expiry = CardExpiryField(_('Expiration date'))
    cc_code = SecurityCodeField(_('Security code'))


class Order(models.Model):
    shop = models.ForeignKey(
        "Shop", related_name='orderList', null=True, on_delete=models.CASCADE)
    ship_profile = models.ForeignKey(
        "ShipProfile", related_name='orders', null=True, on_delete=models.CASCADE)

    ctime = models.DateField(_("Created at"), auto_now=True)
    uptime = models.DateField(_("Updated at"), auto_now=True)

    # Payment
    class PaymentMethod(models.IntegerChoices):
        BANK = 1, _('Transfer')
        COD = 2, _('COD')
    payment_method = models.SmallIntegerField(verbose_name=_(
        'Payment Method'), choices=PaymentMethod.choices)
    payment = models.ForeignKey("Payment", verbose_name=_(
        "Payment Profile"), on_delete=models.CASCADE)

    # Date
    ordered_date = models.DateTimeField(auto_now_add=True)
    confirmed_date = models.DateField(
        _("Confirm Date"), auto_now=False, auto_now_add=False, null=True)
    shippedDate = models.DateTimeField(
        _("Shipped Date"), auto_now=False, auto_now_add=False, null=True)

    # Status
    class Status(models.IntegerChoices):
        NEW = 1, _('Just create')
        CONFIRMED = 2, _('confirmed/deposited')
        SHIPING = 3
        COMPLETED = 0

        SHOP_UNCONFIRMED = -1  # Shop không confirm
        CANCELED_BEFORE_CONFIRM = -2  # Cancel trước khi shop confirm
        CANCELED_AFTER_CONFIRM = -3  # Cancel sau khi shop confirm
        NOSHOW = -4  # Khách không nhận
    status = models.SmallIntegerField(_("Status"), choices=Status.choices)

    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, default=Decimal('0.00'))

    class Meta:
        db_table = "order"

