from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


def index(request):
    return render(request, 'main/index.html')

@login_required
def profile_view(request):
    return render(request, 'main/profile.html')


def check_session(request):
    return JsonResponse({'is_logged_in': request.user.is_authenticated})
