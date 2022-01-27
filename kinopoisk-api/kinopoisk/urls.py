from django.urls import path,re_path

from .models import is_fill_needed
from .views import django_recommendation

is_fill_needed()

urlpatterns = [
    re_path(r'api/gettingmovie/.*', django_recommendation),
    re_path(r'api/')
]

#Initialization