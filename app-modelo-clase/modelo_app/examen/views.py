from django.shortcuts import render, get_object_or_404, redirect
from django.utils.timezone import now
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Evento, Boleto, Localidad, Producto
from datetime import datetime
import json

def index(request):
    eventos_destacados = Evento.objects.all()[:3]
    return render(request, 'examen/index.html', {'eventos_destacados': eventos_destacados})

def eventos(request):
    eventos = Evento.objects.all()
    return render(request, 'examen/eventos.html', {'eventos': eventos})

def boletos(request):
    boletos = Boleto.objects.all()
    return render(request, 'examen/boletos.html', {'boletos': boletos})



@csrf_exempt
def agregar_evento(request):
    localidades = Localidad.objects.all()
    eventos_recientes = Evento.objects.order_by('-id')[:2]
    return render(request, 'examen/agregar_evento.html', {'localidades': localidades, 'eventos_recientes': eventos_recientes})

def agregar_eventobyfetch(request):
     body_unicode = request.body.decode('utf-8')
     body = json.loads(body_unicode)
     if request.method == 'POST':
        try:
            name = body.get('name')
            fecha_inicio = body.get('fecha-inicio')
            fecha_fin = body.get('fecha-fin')
            localidad_name = body.get("localidad")
            localidad = Localidad.objects.filter(name__iexact=localidad_name).first()

            evento = Evento.objects.create(
                name=name,
                fecha_inicio=fecha_inicio,
                fecha_fin=fecha_fin,
                localidad=localidad,
            )

            return JsonResponse({
                'status': 'success',
                'message': 'Evento creado correctamente',
                'evento_id': evento.id, 
                'evento_name': evento.name
            })

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Hubo un error: {str(e)}'}, status=500);


def eliminar_eventobyfetch(request):
    try:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)

        print("🔹 request.body recibido:", body)

        if request.method == 'DELETE':
            evento_id = body.get('evento_id')

            if not evento_id:
                return JsonResponse({'status': 'error', 'message': 'No se proporcionó un ID válido'}, status=400)

            evento = get_object_or_404(Evento, id=evento_id)
            evento.delete()

            return JsonResponse({
                'status': 'success',
                'message': 'Evento eliminado correctamente',
                'evento_id': evento_id
            })

        return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Error en el formato del JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': f'Hubo un error: {str(e)}'}, status=500);

def agregar_producto(request):
    localidades = Localidad.objects.all()
    productos_recientes = Producto.objects.order_by('-id')[:2]
    return render(request, 'examen/agregarProducto.html', {'localidades': localidades, 'productos_recientes': productos_recientes})

def agregar_productobyfetch(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    if request.method == 'POST':
        try:
            name = body.get('name')
            precio = body.get('precio')
            localidad_name = body.get('localidad')
            localidad = Localidad.objects.filter(name__iexact=localidad_name).first()

            producto = Producto.objects.create(
                name=name,
                precio=precio,
                localidad=localidad,
            )

            return JsonResponse({
                'status': 'success',
                'message': 'Producto creado correctamente',
                'producto_id': producto.id, 
                'producto_name': producto.name
            })

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': f'Hubo un error: {str(e)}'}, status=500);

def contar_productos_hoy(request):
    hoy = now().date()
    total = Producto.objects.filter(created_at__date=hoy).count()
    return JsonResponse({"total": total})

def eliminar_productobyfetch(request):
    try:
        body_unicode = request.body.decode('utf-8')  # Decodificar el cuerpo de la solicitud
        body = json.loads(body_unicode)  # Convertir el JSON en un diccionario

        print("🔹 request.body recibido:", body)  # Para depuración en la terminal

        if request.method == 'DELETE':
            producto_id = body.get('producto_id')  # Obtener el ID del producto

            if not producto_id:
                return JsonResponse({'status': 'error', 'message': 'No se proporcionó un ID válido'}, status=400)

            producto = get_object_or_404(Producto, id=producto_id)
            producto.delete()

            return JsonResponse({
                'status': 'success',
                'message': 'Producto eliminado correctamente',
                'producto_id': producto_id
            })

        return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Error en el formato del JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': f'Hubo un error: {str(e)}'}, status=500)