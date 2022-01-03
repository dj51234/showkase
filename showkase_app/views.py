from django.shortcuts import render

# Create your views here.

def render_home(request):
    return render(request, 'showkase_app/index.html')

def render_register(request):
    return render(request, 'showkase_app/register.html')

def render_login(request):
    return render(request, 'showkase_app/login.html')

def render_dashboard(request):
    return render(request, 'showkase_app/dashboard.html')