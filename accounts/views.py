from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.urls import reverse
from .forms import UserProfileForm, UserForm
from .models import Profile


# Create your views here.

def account(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('profile'))
    else:
        return HttpResponseRedirect(reverse('login'))


def login(request):
    """This is the view for login."""
    return render(request, 'account/login.html', {})
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
        return render(request, 'account/login.html', {})


@login_required
def logout(request):
    """This is the view for logout."""
    auth.logout(request)
    return HttpResponseRedirect('/')


@login_required
def profile(request):
    """This is the user profile."""

    POST = request.POST or None
    user = request.user
    profile = user.profile

    profileform = UserProfileForm(
        instance=profile,
        label_suffix=''
    )
    userform = UserForm(
        instance=user,
        label_suffix=''
    )

    if request.method == 'POST':
        if 'profileform' in POST:
            profileform = UserProfileForm(
                data=request.POST,
                files=request.FILES,
                instance=profile,
                label_suffix=''
            )
            if profileform.is_valid():
                profile = profileform.save()
        if 'userform' in POST:
            userform = UserForm(
                data=request.POST,
                instance=user,
                label_suffix=''
            )
            if userform.is_valid():
                user = userform.save()
        return HttpResponseRedirect(reverse('profile'))

    return render(
        request,
        'account/profile.html',
        {
            'profileform': profileform,
            'userform': userform,
        }
    )
