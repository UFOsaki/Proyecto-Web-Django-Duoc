from django.db import models

class Usuario(models.Model):
    email = models.EmailField(unique=True, null=False)
    password = models.CharField(max_length=50, null=False)
    username = models.CharField(max_length=50, null=False)
    name = models.CharField(max_length=50, null=False)
    lastname = models.CharField(max_length=50, null=False)
    phone_number = models.CharField(max_length=50, null=False)
    region_code = models.CharField(max_length=5, null=False)
    city = models.CharField(max_length=50, null=False)
    commune = models.CharField(max_length=50, null=False)
    street = models.CharField(max_length=50, null=False)
    street_number = models.IntegerField(null=False)
    apartment_number = models.IntegerField(null=True, blank=True)
    comments = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.email
