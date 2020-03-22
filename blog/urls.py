from django.urls import path
from . import views

urlpatterns = [
    # Indexes
    path('', views.index, name='index'),
    path('tag/<slug:slug_tag>', views.tag, name='tag'),
    # User profile
    path('profile/<int:user_id>', views.profile, name='profile'),
    # Comment system
    path('<slug:slug>/comment/<int:comment_id>/like/',
         views.comment_like, name="comment.like"),
    path('<slug:slug>/comment/<int:comment_id>/edit/',
         views.comment_edit, name="comment.edit"),
    path('<slug:slug>/comment/<int:comment_id>/delete/',
         views.comment_delete, name="comment.delete"),
    path('<slug:slug>/comment/publish/', views.comment_publish, name="comment.publish"),
    # Post
    path('<slug:slug>/', views.post, name='post'),
]
