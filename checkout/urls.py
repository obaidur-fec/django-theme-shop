from django.urls import path
from . import views

app_name = "checkout"

urlpatterns = [
    path('check/', views.CheckOut, name='pyment_checkout'),
    path('charge_page/', views.Charge, name='pyment_charge'),
    path('chargess/', views.chargess, name='charge'),
    path('bkash_page/', views.Bkash, name='Bkash_pyment'),
    path('paypal_page/', views.Paypal, name='paypal_payment'), 
    path('skrill_page/', views.Skrill, name='skrill_payment'),
    path('test/', views.Sslcommerz, name='Sslcommerz_payment'),
    path('twocheckout/', views.towcheckout, name='towcheckout_payment'),
    path('ss/', views.ss, name='ss_ss'),


   
  ]
