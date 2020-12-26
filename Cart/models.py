from django.db import models
from django.utils import timezone
from django.urls import reverse
from pro_theme.models import ProductItem
from django.contrib.auth.models import User

class Carts(models.Model):
    ordered = models.BooleanField(default=False)
    products = models.ManyToManyField(ProductItem)
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,blank=True)
    total = models.DecimalField(decimal_places=2,max_digits=100, default=0.00)

    class Meta:
        verbose_name_plural = 'Customer Cart'

    def cart_price(self):
        new_total = 0
        for item in self.products.all():
            new_total += item.price
            self.total = new_total
        return new_total








