from django.urls import path
from .views import usuario_create, verificar_email

urlpatterns = [
    path('register/', usuario_create, name='usuario_register'),
    path('verificar-email/', verificar_email, name='verificar_email'),
]