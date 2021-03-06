"""This file contains all view for the blog application."""
from django.contrib.auth.models import User
from django.http import Http404, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from .forms import EditCommentForm, PublishCommentForm
from .models import Comment, Post, Tag


# GET views

def index(request):
    """Default view for the blog. This is the index of the site."""
    posts = Post.objects.order_by('-posted_date')
    context = {
        'posts': posts
    }
    return render(request, 'blog/index.html', context)


def research(request):
    """This is the view for researching post on blog."""

    research = request.GET.get('q')
    if research is None:
        posts = Post.objects.all()
    else:
        posts = Post.objects.filter(
            title__icontains=research
        ) | Post.objects.filter(
            body__icontains=research
        ) | Post.objects.filter(
            tags__value__icontains=research
        )

    context = {
        'posts': posts
    }
    return render(request, 'blog/search.html', context)


def tag(request, slug_tag):
    """This is the view for the tag index."""
    try:
        tag = Tag.objects.filter(value=slug_tag)
    except Tag.DoesNotExist:
        raise Http404("Le tag que vous recherchez n'existe pas.")

    posts = Post.objects.filter(tags__in=tag).order_by('-posted_date')
    context = {
        'posts': posts
    }

    return render(request, 'blog/index.html', context)


def profile(request, user_id):
    """This is the view for user profile."""
    try:
        user = User.objects.get(id=user_id)
        posts = Post.objects.filter(author=user).order_by('-posted_date')
    except Post.DoesNotExist:
        raise Http404("Le profile que vous cherchez n'existe pas.")
    context = {
        'user': user,
        'posts': posts
    }
    return render(request, 'blog/profile.html', context)


def post(request, slug):
    """This is the view for posts."""
    try:
        post = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        raise Http404("Le post que vous cherchez n'existe pas.")
    context = {
        'post': post,
        'previous': None,
        'next': None,
    }

    try:
        context['previous'] = post.get_previous_by_posted_date()
    except Post.DoesNotExist:
        pass

    try:
        context['next'] = post.get_next_by_posted_date()
    except Post.DoesNotExist:
        pass

    return render(request, 'blog/post.html', context)


# POST views

def comment_like(request, slug, comment_id):
    """This is the view for comment like system."""

    response = {
        'success': True,
        'error': ''
    }

    try:
        comment = Comment.objects.get(id=comment_id)
    except Post.DoesNotExist:
        response['success'] = False
        response['error'] = 'This comment does not exists.'

    if request.user in comment.user_liked.all():
        comment.likes -= 1
        comment.user_liked.remove(request.user)
        comment.save()
    else:
        comment.likes += 1
        comment.user_liked.add(request.user)
        comment.save()

    return JsonResponse(response)


def comment_edit(request, slug, comment_id):
    """View for reply to a comment."""
    if not request.user.is_authenticated:
        return JsonResponse({'success': False, 'error': 'You must being login in.'})

    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Comment not found.'})

    if request.user != comment.author:
        return JsonResponse({'success': False, 'error': 'You cannot do this operation for others.'})

    form = EditCommentForm(request.POST)

    if form.is_valid():
        body = form.cleaned_data['comment']

        comment.modified = True
        comment.body = body
        comment.save()

        return JsonResponse({
            'success': True,
            'error': {},
            'redirect_link': reverse(
                'post',
                args=(slug,)
            ) + "#comment" + str(comment.id)
        })
    else:
        return JsonResponse({'success': False, 'error': form.errors})


def comment_delete(request, slug, comment_id):
    """This is the  view for deleting a comment."""
    """View for reply to a comment."""
    if not request.user.is_authenticated:
        return JsonResponse({'success': False, 'error': 'You must being login in.'})

    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Comment not found.'})

    if request.user != comment.author:
        return JsonResponse({'success': False, 'error': 'You cannot do this operation for others.'})

    comment.delete()

    return JsonResponse({
        'success': True,
        'error': {},
        'redirect_link': reverse(
            'post',
            args=(slug,)
        ) + "#comment" + str(comment.id)
    })


def comment_publish(request, slug):
    """View for publish a comment."""
    if not request.user.is_authenticated:
        return JsonResponse({'success': False, 'error': 'You must being login in.'})

    try:
        post = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Post not found.'})

    response = {
        'success': True,
        'error': '',
        'redirect_link': ''
    }

    form = PublishCommentForm(request.POST)

    if form.is_valid():
        body = form.cleaned_data['comment']

        if form.cleaned_data['replyto'] == 0:
            replyto = None
        else:
            try:
                replyto = Comment.objects.get(id=form.cleaned_data['replyto'])
            except Comment.DoesNotExist:
                return JsonResponse({'success': False, 'error': 'Comment not found.'})

        comment = Comment.objects.create(
            post=post,
            replyto=replyto,
            author=request.user,
            body=body
        )

        response['redirect_link'] = reverse('post', args=(
            slug,)) + "#comment" + str(comment.id)

        return JsonResponse(response)
    else:
        return JsonResponse({'success': False, 'error': form.errors})
