from django.urls import path
from . import views

app_name = "Cart"

urlpatterns = [
    path('cart-list-view/', views.cart_list_view, name='cart-list-view'),
    path('add_to_cart/<slug>', views.add_to_cart, name='add_to_cart'),
    path('remove/<slug>', views.remove_from_cart, name='remove_from_cart'),
]
