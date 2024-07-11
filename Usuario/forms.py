from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class UserRegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)
    name = forms.CharField(max_length=30, required=True)
    lastname = forms.CharField(max_length=30, required=True)
    phone = forms.CharField(max_length=15, required=True)
    region_code = forms.CharField(max_length=5, required=True)
    country = forms.CharField(max_length=30, required=True)
    region = forms.CharField(max_length=30, required=True)
    city = forms.CharField(max_length=30, required=True)
    commune = forms.CharField(max_length=30, required=True)
    street = forms.CharField(max_length=100, required=True)
    street_number = forms.CharField(max_length=10, required=True)
    apartment_number = forms.CharField(max_length=10, required=False)
    comments = forms.CharField(widget=forms.Textarea, required=False)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'name', 'lastname', 'phone', 'region_code', 'country', 'region', 'city', 'commune', 'street', 'street_number', 'apartment_number', 'comments']
