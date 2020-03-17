from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('tag/<slug:slug_tag>', views.tag, name='tag'),
    path('test/<slug:slug>/', views.test, name='test'),
    path('profile/<int:user_id>', views.profile, name='profile'),
    path('<slug:slug>/', views.post, name='post'),
]
