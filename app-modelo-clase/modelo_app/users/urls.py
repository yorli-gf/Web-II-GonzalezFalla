from django.urls import path
from .views import usersindex

urlpatterns = [
    path('', usersindex, name='usersindex'),
]
