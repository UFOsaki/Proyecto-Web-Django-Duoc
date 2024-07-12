from django import forms
from .models import Usuario

class UsuarioForm(forms.ModelForm):
    confirm_password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = Usuario
        fields = [
            'email', 'password', 'username', 'name', 'lastname', 'phone_number',
            'region_code', 'city', 'commune', 'street', 'street_number',
            'apartment_number', 'comments'
        ]
        widgets = {
            'password': forms.PasswordInput(),
        }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', 'Las contraseñas no coinciden.')

        return cleaned_data
