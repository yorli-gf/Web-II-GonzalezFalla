from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('eventos/', views.eventos, name='eventos'),
    path('boletos/', views.boletos, name='boletos'),
    path('agregar_evento/', views.agregar_evento, name='agregar_evento'),
    path("agregar_eventobyfetch", views.agregar_eventobyfetch, name="agregar_eventobyfetch"),
    path('eliminar_eventobyfetch', views.eliminar_eventobyfetch, name='eliminar_eventobyfetch'),
    path('agregar_producto/', views.agregar_producto, name='agregar_producto'),
    path('agregar_productobyfetch', views.agregar_productobyfetch, name='agregar_productobyfetch'),
    path('contar_productos_hoy/', views.contar_productos_hoy, name='contar_productos_hoy'),
    path('eliminar_productobyfetch/', views.eliminar_productobyfetch, name='eliminar_productobyfetch'),

]