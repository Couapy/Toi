from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('tag/<slug:slug_tag>', views.tag, name='tag'),
    path('<slug:slug>/', views.post, name='post'),
]
