from django.shortcuts import render
from .forms import RegisterForm, LoginForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required

# Create your views here.

def render_home(request):
    return render(request, 'showkase_app/index.html')

def render_register(request):
    if request.method == 'GET':
        form = RegisterForm()
        return render(request, 'showkase_app/register.html',{'form': form})

    elif request.method == 'POST':
        form = RegisterForm(request.POST)

        if form.is_valid():
            user = User.objects.create_user(
                username = form.cleaned_data['username'],
                email = form.cleaned_data['email'],
                password = form.cleaned_data['password'],
            )
        return HttpResponseRedirect(reverse('showkase:render_login'))

def render_login(request):
    if request.method == 'GET':
        form = LoginForm()
        return render(request,'showkase_app/login.html',{'form': form})

    elif request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            user = authenticate(request, username=username, password=password)

            if user != None:
                login(request,user)
                return HttpResponseRedirect(reverse('showkase:render_dashboard'))
            else: 
                return render(request, 'showkase_app/login.html')
            
@login_required
def render_dashboard(request):
    return render(request, 'showkase_app/dashboard.html')

@login_required
def render_profile(request):
    return render(request, 'showkase_app/profile.html')