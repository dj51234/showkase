from django.shortcuts import render

# Create your views here.

def render_test(request):
    return render(request, 'showkase_app/test.html')