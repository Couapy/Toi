from django.contrib import admin
from django.contrib.auth.models import Group


# Site header
admin.site.site_header = "Administration du site"

# Unregister Models
admin.site.unregister(Group)
