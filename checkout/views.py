from django.shortcuts import render,redirect
import stripe
from Cart.models import Carts
from pro_theme.models import ProductItem
from django.contrib.auth.models import User
import requests
from sslcommerz_python.payment import SSLCSession
from decimal import Decimal
from sslcommerz_lib import SSLCOMMERZ
from sslcommerz_lib import __init__
from django.http import HttpResponse
from urllib3 import PoolManager
from django.contrib.auth.decorators import login_required

stripe.api_key = "sk_test_jVIR6VuioBkrbrOQwjcFD69s00upySTVnd"

@login_required(login_url='users-login')
def CheckOut(request):
    if request.user.is_authenticated:
        order = Carts.objects.get(user= request.user)
        return render(request,'checkout/check_out.html', {'cart': order})
    else:
        order = Carts.objects.get(user= request.user)
        return render(request,'checkout/check_out.html', {'cart': order})


def Charge(request, *args , **kwargs):
    if request.method == 'POST':
        # amount = int(Carts.cart_price(self) * 100)
        print('Data' , request.POST)
        order = Carts.objects.get(user=request.user)
        charge = stripe.Charge.create(
        	amount = order.cart_price() * 100 ,
            currency = 'usd',
            description = 'Pyment',
            source = request.POST['stripeToken'],

        	)
    return render(request, "checkout/charge.html")
   
def Paypal(request):
    order = Carts.objects.get(user= request.user)
    return render(request, 'checkout/paypal.html' , {'cart': order})

def chargess(request):
    order = Carts.objects.get(user= request.user)
    return render(request, 'checkout/ss.html' , {'cart': order})

def Sslcommerz(request):
    if request.method == "POST":
        settings = { 'store_id': 'darkw5ec50255ccdb7', 'store_pass': 'darkw5ec50255ccdb7@ssl', 'issandbox': True }
        sslcommez = SSLCOMMERZ(settings)
        post_body = {}
        post_body['total_amount'] = 10.26
        post_body['currency'] = "BDT"
        post_body['tran_id'] = "12345"
        post_body['success_url'] = "your success url"
        post_body['fail_url'] = "your fail url"
        post_body['cancel_url'] = "your cancel url"
        post_body['emi_option'] = 0
        post_body['cus_name'] = "test"
        post_body['cus_email'] = "test@test.com"
        post_body['cus_phone'] = "01700000000"
        post_body['cus_add1'] = "customer address"
        post_body['cus_city'] = "Dhaka"
        post_body['cus_country'] = "Bangladesh"
        post_body['shipping_method'] = "NO"
        post_body['multi_card_name'] = ""
        post_body['num_of_item'] = 1
        post_body['product_name'] = "Test"
        post_body['product_category'] = "Test Category"
        post_body['product_profile'] = "general"
        response = sslcommez.createSession(post_body)
        return render(request, 'checkout/ss.html', {'post_body': post_body})
    order = Carts.objects.get(user= request.user)
    return render(request, 'checkout/sslcommerz.html', {'cart': order})
