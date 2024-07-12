from django.urls import path
from .views import autenticacion_login

urlpatterns = [
    path('login/', autenticacion_login, name='autenticacion_login'),
]
