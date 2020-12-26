from django.shortcuts import render,redirect,get_object_or_404
from blog.models import comment
from django.views.generic import ListView,CreateView
from blog.forms import CommentForm


def home(request):
    return render(request, 'blog/home.html')


class PostListView(ListView):
    model = comment
    comment_show = comment.objects.all()
    context_object_name = 'comment_show'
    ordering = ['-date_posted']
   
class PostCreateView(CreateView):
    model = comment
    fields = ['comments_field']

    def form_valid(self , form):
        form.instance.author = self.request.user
        return super().form_valid(form)
