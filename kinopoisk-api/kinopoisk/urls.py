from django.urls import path,re_path

from .models import is_fill_needed
from .views import add_movie

is_fill_needed()

urlpatterns = [
    re_path(r'api/gettingmovie/.*', add_movie),
]

#Initialization