from django.db import models

class Localidad(models.Model):
    name = models.CharField(max_length=100, null=False)
    estatus = models.BooleanField(null=False)

    def __str__(self):
        return self.name

class Evento(models.Model):
    name = models.CharField(max_length=300, null=False)
    fecha_inicio = models.DateTimeField(null=False)
    fecha_fin = models.DateTimeField(null=False)
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.name

class Boleto(models.Model):
    precio = models.FloatField(null=False)
    tipo_boleto_id = models.IntegerField()
    evento = models.ForeignKey(Evento, on_delete=models.CASCADE)
    fecha = models.DateTimeField()

    def __str__(self):
        return f"Boleto {self.id} - {self.evento.name}"

class Producto(models.Model):
    name = models.CharField(max_length=200)
    precio = models.FloatField()
    localidad = models.ForeignKey(Localidad, on_delete=models.CASCADE)

    def __str__(self):
        return self.name