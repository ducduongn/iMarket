from django.db import models

# Create your models here.


class Customer(models.Model):
    account = models.ForeignKey(
        'account.CustomUser',
        on_delete=models.CASCADE,
    )


class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    quantity = models.IntegerField()
    # description = models.TextField()
    image = models.ImageField()

    def __str__(self):
        return self.title

    # @property
    # def imageURL(self):
    #     try:
    #         url = self.image.url
    #     except:
    #         url = ''
    #     return url


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
