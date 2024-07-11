from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    region_code = models.CharField(max_length=10, blank=True)
    country = models.CharField(max_length=50, blank=True)
    region = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=50, blank=True)
    commune = models.CharField(max_length=50, blank=True)
    street = models.CharField(max_length=100, blank=True)
    street_number = models.CharField(max_length=10, blank=True)
    apartment_number = models.CharField(max_length=10, blank=True)
    comments = models.TextField(blank=True)

    # Añadir related_name para evitar conflictos
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  # Nombre alternativo para el acceso reverso
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',  # Nombre alternativo para el acceso reverso
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )
