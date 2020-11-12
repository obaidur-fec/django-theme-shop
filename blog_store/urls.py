from django.urls import path
from . import views
from django.views.generic import TemplateView

app_name ='blog_store'

urlpatterns = [
    path('#', TemplateView.as_view(template_name = "blog_store/freebie.html"), name='theme'),
    path('freebie/', views.freebie, name ="freebie"),

    #BootstrapMade.com-------------
    path('theeventrfreebootstrapmade/', views.theeventrfreebootstrapmade, name ="theeventrfreebootstrapmade"),
    path('devfoliobootstrapmade/', views.devfoliobootstrapmade, name ="devfoliobootstrapmade"),
    path('estateagencybootstrapmade/', views.estateagencybootstrapmade, name ="estateagencybootstrapmade"),

    #Other_web_sites---------------
    path('eleganter/', views.Eleganter, name ="eleganter"),
    path('adalotfreepersonal/', views.adalotfreepersonal, name ="adalotfreepersonal"),
    path('sleekfreedashboard/', views.sleekfreedashboard, name ="sleekfreedashboard"),

    #Colorlib--------------------
    path('amincolorlib/', views.amincolorlib, name ="amincolorlib"),
    path('citylistingcolorlib/', views.citylistingcolorlib, name ="citylistingcolorlib"),
    path('directingcolorlib/', views.directingcolorlib, name ="directingcolorlib"),
    path('hazzecolorlib/', views.hazzecolorlib, name ="hazzecolorlib"),
    path('jobfinderportalcolorlib/', views.jobfinderportalcolorlib, name ="jobfinderportalcolorlib"),
]
