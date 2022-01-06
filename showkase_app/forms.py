from django import forms
from django.forms import ModelForm 
from .models import Profile

class RegisterForm(forms.Form):
    username = forms.CharField(label='', max_length=15, widget=forms.widgets.TextInput(attrs={'placeholder':'Username'}))
    email = forms.CharField(label='', widget=forms.widgets.EmailInput(attrs={'placeholder':'Email Address'}))
    password = forms.CharField(label='', max_length=15, widget=forms.widgets.PasswordInput(attrs={'placeholder':'Password'}))

class LoginForm(forms.Form):
    username = forms.CharField(label='', max_length=15, widget=forms.widgets.TextInput(attrs={'placeholder':'Username'}))
    password = forms.CharField(label='', max_length=15, widget=forms.widgets.PasswordInput(attrs={'placeholder':'Password'}))

class EditProfile(ModelForm):
    class Meta:
        model = Profile 
        fields = ['first_name', 'last_name', 'avatar']