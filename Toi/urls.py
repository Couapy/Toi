from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # Admin views
    path('admin/', admin.site.urls),
    # Blog views
    path('', include('blog.urls')),
    # Social Django views
    path("", include("social_django.urls", namespace="social")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
