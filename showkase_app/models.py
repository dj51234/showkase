from django.db import models
from django import forms
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User,null=True,on_delete=models.CASCADE)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    password = forms.CharField(widget=forms.PasswordInput)
    avatar = models.ImageField(null=True,blank=True,)

    def __str__(self):
        return f"{str(self.user)},{self.first_name},{self.last_name}"
