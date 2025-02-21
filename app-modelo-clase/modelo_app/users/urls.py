from django.urls import path
from .views import usersindex


from . import views

urlpatterns = [
    path('', usersindex, name='usersindex'),
    path("create", views.createUserView, name="createUserView"),
    path("createUser", views.createUser, name="createUser"),
    path("details/<int:id>", views.userDetail, name="userDetail"),
    path("createUser-by-fetch", views.createUserByFetch, name="createUser-by-fetch")
    
]
