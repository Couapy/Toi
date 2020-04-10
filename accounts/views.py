from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.urls import reverse


# Create your views here.

def account(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('profile'))
    else:
        return HttpResponseRedirect(reverse('login'))


def login(request):
    """This is the view for login."""
    return render(request, 'accounts/login.html', {})
    if request.method is 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            # Redirect to a success page.
        else:
            # Return an 'invalid login' error message.
            pass
    else:
        return render(request, 'accounts/login.html', {})


@login_required
def logout(request):
    """This is the view for logout."""
    auth.logout(request)
    return HttpResponseRedirect('/')


@login_required
def profile(request):
    """This is the user profile."""
    return render(
        request,
        'accounts/profile.html',
        {
            'user': request.user
        }
    )
