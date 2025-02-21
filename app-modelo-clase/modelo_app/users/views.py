import json
from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from .models import User


def createUserView(request):
    return render(request, "users/create.html")

def createUserByFetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    return JsonResponse ({
        "NOMBRE_RECIBIDO": body.get("name")
    })

def createUser(request):
    data = {}
    try: 
        if request.method == "POST": 
            name = request.POST.get("name")
            email = request.POST.get("email")
            age = request.POST.get("age")
            rfc = request.POST.get("rfc")
            photo = request.POST.get("photo")

            user = User(name=name, email=email, age=age, rfc=rfc, photo=photo)
            user.save()
            data["user"] = user
            data["message"] = "User created"
            data["status"] = "sucess"
    except Exception as e: 
        data["message"] = str(e)
        data["status"] = "error"

    return render(request, "users/create.html", data)

def userDetail(request, id):
    user = get_object_or_404(User, id=id)

    if request.method == "POST":
        user.name = request.POST.get("name")
        user.email = request.POST.get("email")
        user.age = request.POST.get("age")
        user.rfc = request.POST.get("rfc")
        user.photo = request.POST.get("photo")
        user.save()
        return redirect('usersindex')  

    return render(request, "users/detail.html", {"user": user})

def usersindex(request):
    users = User.objects.all()  # Obtener todos los usuarios SIN direcciones
    return render(request, 'users/index.html', {'users': users})
