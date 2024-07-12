# Register your models here.
from django.contrib import admin
from .models import Usuario

@admin.register(Usuario)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'username', 'name', 'lastname', 'phone_number', 'region_code', 'city', 'commune', 'street', 'street_number', 'apartment_number', 'comments')
