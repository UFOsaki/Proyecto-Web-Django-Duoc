from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from .models import Usuario
from .forms import UsuarioForm

def usuario_create(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()
            return redirect('autenticacion_login')  # Redirige a la URL de inicio de sesión después de crear el usuario
        else:
            return JsonResponse({'errors': form.errors}, status=400)
    else:
        form = UsuarioForm()
        return render(request, 'Usuario/register.html', {'form': form})

def verificar_email(request):
    email = request.GET.get('email', None)
    data = {
        'is_taken': Usuario.objects.filter(email__iexact=email).exists()
    }
    return JsonResponse(data)