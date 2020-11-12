from django.shortcuts import render
from . models import ProductItem
from django.views.generic import ListView

# Create your views here.

class PostListView(ListView):
    model = ProductItem
    product_show = ProductItem.objects.all()
    context_object_name = 'product_show'
    ordering = ['-date_added']

def Product_Discription(request,slug):
        print (slug)
        product_show = ProductItem.objects.get(slug=slug)
        return render(request,'pro_theme/product_discription.html',{'product_show': product_show})