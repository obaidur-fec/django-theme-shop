"""ProjectBlack01 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


# namespace='cart',
urlpatterns = [
    path('check_out/', include('checkout.urls', namespace='checkout')),
    path('skril-paymant/', include('skrill.urls', namespace='skrill')),
    path('cart/', include('Cart.urls', namespace='Cart')),
    path('pro_theme/', include('pro_theme.urls',namespace='pro_theme')),
    path('', include('blog.urls', namespace='blog')),
    path('blog_store/', include('blog_store.urls',namespace="blog_store")),
    path('users/', include('users.urls')),
    path('admin/', admin.site.urls),
    

]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
