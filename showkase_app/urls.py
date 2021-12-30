from django.urls import path 
from . import views

app_name = 'showkase'

urlpatterns = [
    path('home/',views.render_home,name="render_home")
]