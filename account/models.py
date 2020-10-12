from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

from phonenumber_field.modelfields import PhoneNumberField

from .managers import CustomUserManager


# Custom User với email làm trường chính


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('Email address'),
                              unique=True,
                              null=False)

    is_verified = models.BooleanField(_('Verified'),
                                      default=False,
                                      null=False)

    # Để không cần nhập trong quá trình Dev sprint 1
    # address = models.CharField(_('Address'),
    #                            max_length=150,
    #                            blank=False,
    #                            null=False)

    # city = models.CharField(_('City'),
    #                             max_length=100,
    #                             blank=False,
    #                             null=False)
    # country = models.CharField(
    #     _('Country'), max_length=100, blank=False, null=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


# Hồ sơ của user. Sprint 1 càng đơn giản càng tốt
class UserProfile(models.Model):
    # Foreign key
    user = models.OneToOneField(get_user_model(), verbose_name=_(
        "Account"), on_delete=models.CASCADE)
    # SĐT
    # phone_number = PhoneNumberField(_("Phone number"))
    # Địa chỉ. Giờ mới chỉ là VAR CHAR cho đơn giản dể test.
    # location = models.CharField(max_length=140)

    # Các lựa chọn cho giới tính
    # class Gender(models.IntegerChoices):
    #     MALE = 1
    #     FEMALE = 2
    #     OTHER = 3
    #     UNKNOWN = -1
    # gender = models.IntegerField(choices=Gender.choices)

    def __unicode__(self):
        return u'Profile of user: %s' % self.user

# @receiver(post_save, sender=User)
# def create_or_update_user_profile(sender, instance, created, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)
#     instance.profile.save()

# ? Tại sao Product lại ở đây ?

# class Product(models.Model):
#     title = models.CharField(max_length=100)
#     price = models.FloatField()
#     quantity = models.IntegerField()
#     # category = models.CharField(choices=CATEGORY_CHOICES, max_length=2)
#     # brand = models.CharField(choices=BRAND_CHOICES, max_length=1)
#     description = models.TextField()
#     image = models.ImageField()

#     def __str__(self):
#         return self.title

#     # @property
#     # def imageURL(self):
#     #     try:
#     #         url = self.image.url
#     #     except:
#     #         url = ''
#     #     return url


# class Order(models.Model):
# 	customer = models.ForeignKey(
# 	Customer, on_delete=models.SET_NULL, null=True, blank=True)
# 	order_date = models.DateTimeField(auto_now_add=True)
# 	complete = models.BooleanField(default=False)
# 	transaction_id = models.CharField(max_length=100, null=True)

# 	def __str__(self):
# 		return str(self.id)

# 	@property
# 	def shipping(self):
# 		shipping = False
# 		orderitems = self.orderitem_set.all()
# 		for i in orderitems:
# 			if i.product.digital == False:
# 				shipping = True
# 		return shipping

# 	@property
# 	def get_cart_total(self):
# 		orderitems = self.orderitem_set.all()
# 		total = sum([item.get_total for item in orderitems])
# 		return total

# 	@property
# 	def get_cart_items(self):
# 		orderitems = self.orderitem_set.all()
# 		total = sum([item.quantity for item in orderitems])
# 		return total

# class OrderItem(models.Model):
#     product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
#     order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
#     quantity = models.IntegerField(default=0, null=True, blank=True)
#     date_added = models.DateTimeField(auto_now_add=True)

        # @property
        # def get_total(self):
        # 	total = self.product.price * self.quantity
        # 	return total
