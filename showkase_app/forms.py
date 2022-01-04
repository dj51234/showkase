from django import forms 

class RegisterForm(forms.Form):
    username = forms.CharField(max_length=15, widget=forms.widgets.TextInput(attrs={'placeholder':'Username'}))
    email = forms.CharField(widget=forms.widgets.EmailInput(attrs={'placeholder':'Email Address'}))
    password = forms.CharField(max_length=15, widget=forms.widgets.PasswordInput(attrs={'placeholder':'Password'}))

class LoginForm(forms.Form):
    username = forms.CharField(max_length=15, widget=forms.widgets.TextInput(attrs={'placeholder':'Username'}))
    password = forms.CharField(max_length=15, widget=forms.widgets.PasswordInput(attrs={'placeholder':'Password'}))