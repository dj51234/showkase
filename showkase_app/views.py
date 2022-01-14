from django.shortcuts import render
from .forms import EditProfile, RegisterForm, LoginForm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models.signals import post_save #Import a post_save signal when a user is created
from django.contrib.auth.models import User # Import the built-in User model, which is a sender
from django.dispatch import receiver # Import the receiver
from .models import Profile

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
                return render(request, 'showkase_app/login.html',{'form':form})
            
@login_required
def render_dashboard(request):
    return render(request, 'showkase_app/dashboard.html')

@login_required
def render_profile(request):
    
    if request.method == 'POST':
        form = EditProfile(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('showkase:render_profile'))
    else:
        form = EditProfile(instance=request.user.profile)
        return render(request, 'showkase_app/profile.html',{'form':form})

@login_required
def user_logout(request):
    logout(request)
    return HttpResponseRedirect(reverse('showkase:render_login'))

@receiver(post_save, sender=User) 
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
