from django.urls import path
from . import views
from . views import PostListView

app_name = "pro_theme"

urlpatterns = [
    path('product_list/' , PostListView.as_view(template_name='pro_theme/product.html') , name='product_list'),
    path('product_discription/<slug>/', views.Product_Discription, name='product_discription'),
  
]