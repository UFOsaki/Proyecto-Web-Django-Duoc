from django.urls import path
from . import views 
from django.contrib.auth import views as auth_views 
from .views import profile_view, check_session

urlpatterns = [
    path('', views.index, name='index'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),  # Redirige a la página principal después de cerrar sesión
    path('profile/', profile_view, name='profile'),
    path('check_session/', check_session, name='check_session'),
]
