from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class UserRegisterForm(UserCreationForm):
    email = forms.EmailField()
    username = forms.CharField(label='Enter Username', help_text='* Username should not have any space' , min_length=4, max_length=150)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']
  