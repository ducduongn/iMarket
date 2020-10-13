from django.db import models
from django.utils.translation import ugettext_lazy as _


# Create your models here.


class Customer(models.Model):
    account = models.ForeignKey(
        'account.CustomUser',
        on_delete=models.CASCADE,
    )


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    # description = models.TextField()
    image = models.ImageField()
    category = models.ForeignKey('Category', on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.name

    # def save(self, *args, **kwargs):
    #     if not self.category.parent:
    #         raise ValueError("Category is a parent")
    #     super(Product, self).save(*args, **kwargs)

    # @property
    # def imageURL(self):
    #     try:
    #         url = self.image.url
    #     except:
    #         url = ''
    #     return url

class Category(models.Model):
    name = models.CharField(_('Category Name'),max_length=50, unique=True, blank=False)
    description = models.CharField(_('Description'), max_length=200, blank=True)
    parent = models.ForeignKey('Category', verbose_name=_('Parent Category'), null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

# Tạm bỏ qua trong giai đoạn Dev này
# class Brand(models.Model):
#     name = models.CharField(_('Category Name'),max_length=50, blank=False)


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
# 		return total blank=True))NULL, null=True)
#     order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
#     quantity = models.IntegerField(default=0, null=True, blank=True)
#     date_added = models.DateTimeField(auto_now_add=True)

        # @property
        # def get_total(self):
        # 	total = self.product.price * self.quantity
        # 	return total
