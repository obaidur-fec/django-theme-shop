from django.contrib import admin
from .models import ProductItem

class ProductItemAdmin(admin.ModelAdmin):
    list_display = ('images','theme_name', 'author_name','price')

admin.site.register(ProductItem, ProductItemAdmin)