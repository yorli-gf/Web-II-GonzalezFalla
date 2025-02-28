from django.shortcuts import render
from .models import Evento, Boleto

def index(request):
    return render(request, 'examen/index.html')

def index(request):
    # Obtener los eventos destacados (puedes filtrar por algún criterio)
    eventos_destacados = Evento.objects.all()[:3]  # Mostrar los primeros 3 eventos
    return render(request, 'examen/index.html', {'eventos_destacados': eventos_destacados})

def eventos(request):
    eventos = Evento.objects.all()
    return render(request, 'examen/eventos.html', {'eventos': eventos})

def boletos(request):
    boletos = Boleto.objects.all()
    return render(request, 'examen/boletos.html', {'boletos': boletos})
