from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login as auth_login
from django.contrib.auth.models import User
from .forms import LoginForm
from Usuario.models import Usuario  # Asegúrate de cambiar 'otra_app' por el nombre de tu aplicación

def autenticacion_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            try:
                usuario = Usuario.objects.get(email=email)
                if usuario.password == password:  # Comparar la contraseña en texto plano
                    # Crear o obtener un usuario de Django y loguearlo
                    user, created = User.objects.get_or_create(username=usuario.email)
                    if created:
                        user.set_password(password)  # Configurar la contraseña del usuario de Django
                        user.save()
                    auth_login(request, user)
                    return redirect('index')  # Redirige a la página principal o a la deseada
                else:
                    messages.error(request, 'Correo o contraseña incorrectos')
            except Usuario.DoesNotExist:
                messages.error(request, 'Correo o contraseña incorrectos')
    else:
        form = LoginForm()
    return render(request, 'Autenticacion/login.html', {'form': form})
