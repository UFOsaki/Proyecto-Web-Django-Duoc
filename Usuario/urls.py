from django.urls import path
from .views import usuario_create, login_view, verificar_email

urlpatterns = [
    path('register/', usuario_create, name='usuario_register'),
    path('login/', login_view, name='login'),
     path('verificar-email/', verificar_email, name='verificar_email'),
]