from django.shortcuts import render,redirect,HttpResponseRedirect,get_object_or_404
from django.contrib import messages
from django.core.exceptions import ObjectDoesNotExist
from django.urls import reverse
from django.utils import timezone
from .models import Carts
from pro_theme.models import ProductItem
from django.contrib.auth.models import User
# from django.views.generic import ListView, DetailView, View


# def Cart_List_View(request, *args, **kwargs):
#         order = Carts.objects.get()
#         orders = Carts.objects.all()
#         return render(request,'Cart/cart_list_view.html', {'object': order , 'objects': orders})


def Cart_List_View(request, *args, **kwargs):
    if not request.user.is_authenticated:
        try:
            the_id = request.session['cart_id']
        except:
            the_id=None
        if the_id:
            order = Carts.objects.get(id= the_id)
            return render(request,'Cart/cart_list_view.html', {'cart': order})
        else:
            empty_massage = "Your Cart Is Empty, Please Keep Shopping..."
            order = {"empty":True, 'empty_massage': empty_massage}
            return render(request,'Cart/cart_list_view.html', order)

    if request.user.is_authenticated:
        order = Carts.objects.get(user= request.user)
        return render(request,'Cart/cart_list_view.html', {'cart': order})
    else:
        order = Carts.objects.get(user= request.user)
        return render(request,'Cart/cart_list_view.html', {'cart': order})



def add_to_cart(request, slug):
    if request.user.is_authenticated:
        product = get_object_or_404(ProductItem, slug=slug)
        order_item, created = Carts.objects.get_or_create(user=request.user)
        order_qs = Carts.objects.filter(user=request.user)
        if order_qs.exists():
            for i in order_qs:
                print(i)
            if i.products.filter(slug=slug).exists():
                return redirect('Cart:cart-list-view')
            if not i in order_item.products.all():
                i.products.add(product)
                i.save()
                print (i.products.count())
                return redirect('Cart:cart-list-view')
        else:       
            return redirect('Cart:cart-list-view')
          
    else:
        request.session.set_expiry(30000000)
        try:
            the_id = request.session["cart_id"]
        except Carts.DoesNotExist:
            order_item, created = Carts.objects.get_or_create(id = the_id)
            request.session["cart_id"] = order_item.id
            order_item.save()
        except:
            new_cart = Carts()
            new_cart.save()
            request.session['cart_id'] = new_cart.id
            the_id = new_cart.id
            
        order_item, created = Carts.objects.get_or_create(id=the_id)
        product = get_object_or_404(ProductItem, slug=slug)
        order_qs = Carts.objects.filter(id=the_id)
        if order_qs.exists():
            for i in order_qs:
                print(i)
            if i.products.filter(slug=slug).exists():
                return redirect('Cart:cart-list-view')
            if not i in order_item.products.all():
                i.products.add(product)
                i.save()
                request.session['Carts_Total'] = i.products.count()
                print (i.products.count())
                return redirect('Cart:cart-list-view')
        else:       
            return redirect('Cart:cart-list-view')
    return redirect('Cart:cart-list-view')
        

def remove_from_cart(request, slug):
    if request.user.is_authenticated:
        product = get_object_or_404(ProductItem, slug=slug)
        order_qs = Carts.objects.filter(user=request.user)
        if order_qs.exists():
            for i in order_qs:
                print(i)
            if i.products.filter(slug=slug).exists():
                order_item = Carts.objects.filter()
                i.products.remove(product)
                request.session['Carts_Total'] = i.products.count()
                return redirect('Cart:cart-list-view')
            else:
                return redirect('Cart:cart-list-view', slug=slug)
        else:
            return redirect('Cart:cart-list-view',slug=slug)
    else:
        try:
            the_id = request.session["cart_id"]
        except Carts.DoesNotExist:
            order_item, created = Carts.objects.get_or_create(id = the_id)
            request.session["cart_id"] = order_item.id
            order_item.save()
        except:
            new_cart = Carts()
            new_cart.save()
            request.session['cart_id'] = new_cart.id
            the_id = new_cart.id

        product = get_object_or_404(ProductItem, slug=slug)
        order_qs = Carts.objects.filter(id = the_id)
        if order_qs.exists():
            for i in order_qs:
                print(i)
            if i.products.filter(slug=slug).exists():
                order_item = Carts.objects.filter()
                i.products.remove(product)
                request.session['Carts_Total'] = i.products.count()
                return redirect('Cart:cart-list-view')
            else:
                return redirect('Cart:cart-list-view', slug = slug)
   
        return redirect('Cart:cart-list-view',slug=slug )

















# def add_to_cart(request, slug):
#     product = get_object_or_404(ProductItem, slug=slug)
#     order_item = Carts.objects.get_or_create()
#     order_qs = Carts.objects.filter()
#     if order_qs.exists():
#         for i in order_qs:
#             pass
#         if i.products.filter(slug=slug).exists():
#             return redirect('Cart:cart-list-view')
#         else:
#             i.products.add(product)
#             return redirect('Cart:cart-list-view')
#     else:
#         return redirect('Cart:cart-list-view')


# def remove_from_cart(request, slug):
#     product = get_object_or_404(ProductItem, slug=slug)
#     order_item = Carts.objects.get_or_create()
#     order_qs = Carts.objects.filter()
#     if order_qs.exists():
#         order = order_qs[0]
#         check if the order item is in the order
#         if order.products.filter(slug=slug).exists():
#             order_item = Carts.objects.filter()[0]
#             order.products.remove(product)
#             return redirect('Cart:cart-list-view')
#         else:
#             messages.info(request, "This item was not in your cart")
#             return redirect('Cart:cart-list-view', slug= slug)
#     else:
#         messages.info(request, "You do not have an active order")
#         return redirect('Cart:cart-list-view', slug= slug









