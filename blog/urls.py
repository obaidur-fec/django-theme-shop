from django.urls import path
from . import views
from . views import PostListView,PostCreateView
#PostCreateView,PostDetailView

app_name = "blog"

urlpatterns = [
   path('', views.home , name= 'blog-home'),
   path('post_create_view/' , PostCreateView.as_view(template_name='blog/comment_form.html') , name='blog-create'),
   path('post_create_view/form' , PostCreateView.as_view(template_name='blog/comment_list.html') , name='blog-comment'),
   path('post_list_view/' , PostListView.as_view(template_name='blog/comment_list.html') , name='blog-comment'),
   
]
