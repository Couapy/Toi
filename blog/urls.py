from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('tag/<slug:slug_tag>', views.tag, name='tag'),
    path('profile/<int:user_id>', views.profile, name='profile'),
    # path('comment/', views.comment, name="comment"),
    path('<slug:slug>/comment/<int:comment_id>/like/', views.comment_like, name="comment.like"),
    path('<slug:slug>/comment/<int:comment_id>/edit/', views.comment_edit, name="comment.edit"),
    path('<slug:slug>/comment/publish/', views.comment_publish, name="comment.publish"),
    path('<slug:slug>/', views.post, name='post'),
]
