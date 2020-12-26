from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.urls import reverse


class comment(models.Model):

	comments_field = models.CharField(max_length=200)
	date_posted = models.DateTimeField(default=timezone.now)
	author = models.ForeignKey(User ,on_delete = models.CASCADE)

	def __str__(self):
	  return self.comments_field

	class Meta:
	    verbose_name_plural = 'Customer Comment'

	def get_absolute_url(self):
		return reverse('blog:blog-comment')
