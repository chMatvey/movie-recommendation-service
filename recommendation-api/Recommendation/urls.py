from django.urls import path,re_path
from .views import django_recommendation


urlpatterns = [
    re_path(r'api/recommendation/.*', django_recommendation)
]