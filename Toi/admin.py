from social_django.models import Association, Nonce, UserSocialAuth
from django.contrib import admin
from django.contrib.auth.models import User, Group


admin.autodiscover()

# Site header
admin.site.site_header = "Administration du site"

# Unregister Models
admin.site.unregister(User)
admin.site.unregister(Group)

try:
    admin.site.unregister(Association)
    admin.site.unregister(Nonce)
    admin.site.unregister(UserSocialAuth)
except admin.sites.NotRegistered:
    pass
