from django.db import models
from django.utils import timezone
from django.urls import reverse

class ProductItem(models.Model):
    images = models.ImageField()
    theme_name = models.CharField(max_length=100)
    author_name = models.CharField(max_length=50)
    description = models.TextField()
    date_added = models.DateTimeField(default=timezone.now)
    slug = models.SlugField(unique=True)
    price = models.IntegerField(default=1)
    discount_price = models.FloatField(blank=True, null=True)
   
    def __str__(self):
        return self.theme_name

    class meta:
        ordering = ['date_added']
