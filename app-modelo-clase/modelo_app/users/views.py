from django.shortcuts import render
from .models import User

def usersindex(request):
    users = User.objects.all()  # Obtener todos los usuarios SIN direcciones
    return render(request, 'users/index.html', {'users': users})
