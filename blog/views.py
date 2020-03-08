"""This file contains all view for the blog application."""
from django.shortcuts import render
from django.http import Http404
from .models import Post, Tag


def index(request):
    """Default view for the blog. This is the index of the site."""
    posts = Post.objects.all()
    context = {
        'posts': posts
    }
    return render(request, 'blog/index.html', context)


def tag(request, slug_tag):
    """This is the view for the tag index."""
    try:
        tag = Tag.objects.filter(value=slug_tag)
    except Tag.DoesNotExist:
        raise Http404("Le tag que vous recherchez n'existe pas.")
    
    posts = Post.objects.filter(tags__in=tag)
    context = {
        'posts': posts
    }

    return render(request, 'blog/index.html', context)


def post(request, slug):
    """This is the view for posts."""
    try:
        post = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        raise Http404("Le post que vous cherchez n'existe pas.")
    context = {
        'post': post,
        'previous': post,
        'next': post,
    }
    return render(request, 'blog/post.html', context)
