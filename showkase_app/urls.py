from django.urls import path 
from . import views

app_name = 'showkase'

urlpatterns = [
    path('test/',views.render_test,name="render_test")
]