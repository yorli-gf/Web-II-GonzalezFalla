from django.contrib import admin
from .models import Localidad, Evento, Boleto, Producto

admin.site.register(Localidad)
admin.site.register(Evento)
admin.site.register(Boleto)
admin.site.register(Producto)
