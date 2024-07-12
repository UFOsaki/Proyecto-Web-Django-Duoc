# Usuario/views.py
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from .models import Usuario
from .forms import UsuarioForm
from django.contrib.auth import views as auth_views


def usuario_create(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.password = make_password(form.cleaned_data['password'])
            user.save()
            return redirect('login')  # Redirige a la URL de inicio de sesión después de crear el usuario
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    else:
        form = UsuarioForm()
        return render(request, 'Usuario/register.html', {'form': form})


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')  # Redirige a la página principal o a donde desees
            else:
                form.add_error(None, 'Nombre de usuario o contraseña incorrectos.')
    else:
        form = LoginForm()
    return render(request, 'Usuario/login.html', {'form': form})

def verificar_email(request):
    email = request.GET.get('email', None)
    data = {
        'is_taken': Usuario.objects.filter(email__iexact=email).exists()
    }
    return JsonResponse(data)