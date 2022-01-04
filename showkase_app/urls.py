from django.urls import path 
from . import views

app_name = 'showkase'

urlpatterns = [
    path('home/',views.render_home,name="render_home"),
    path('login/',views.render_login,name="render_login"),
    path('register/',views.render_register,name="render_register"),
    path('dashboard/',views.render_dashboard,name="render_dashboard"),
    path('profile/',views.render_profile,name="render_profile"),
]