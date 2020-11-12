from django.contrib import admin
from .models import User, comment

class CommentsAdmin(admin.ModelAdmin):
    list_display = ('comments_field','author')

admin.site.register(comment, CommentsAdmin)





