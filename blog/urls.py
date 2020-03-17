from django.urls import path
from . import views

urlpatterns = [
    # Tests views
    path('test/', views.test, name='test'),
    # Default views
    path('', views.index, name='index'),
    path('tag/<slug:slug_tag>', views.tag, name='tag'),
    path('profile/<int:user_id>', views.profile, name='profile'),
    path('comment/<int:comment_id>/like/', views.comment_like, name="comment.like"),
    path('comment/<int:comment_id>/reply/', views.comment_like, name="comment.reply"),
    path('<slug:slug>/', views.post, name='post'),
]
