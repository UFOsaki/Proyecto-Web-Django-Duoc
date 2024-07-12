from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.http import JsonResponse
from .forms import UserRegisterForm
import json

def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        if User.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'El correo electrónico ya está registrado.'})
        form = UserRegisterForm(data)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': form.errors})
    else:
        form = UserRegisterForm()
    return render(request, 'Usuario/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
    else:
        form = AuthenticationForm()
    return render(request, 'Usuario/login.html', {'form': form})

def get_users(request):
    users = list(User.objects.values('username', 'email'))
    return JsonResponse(users, safe=False)


def register_view(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': True})
        else:
            # Convierte los errores del formulario a un diccionario simple
            errors = form.errors.as_json()
            return JsonResponse({'success': False, 'errors': errors}, status=400)
    else:
        form = UserRegisterForm()
    return render(request, 'register.html', {'form': form})