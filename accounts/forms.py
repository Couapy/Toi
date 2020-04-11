from django import forms
from .models import Profile
from django.contrib.auth.models import User
from .widgets import ImagePreviewWidget


# Create the form class.
class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            'username',
            'last_name',
            'first_name',
            'email',
        ]


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = [
            'bio',
            'image',
        ]
        widgets = {
            'image': ImagePreviewWidget
        }
