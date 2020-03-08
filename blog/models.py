from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from .functions import get_date

# Blog models


class Tag(models.Model):
    """Tag model."""
    value = models.CharField(max_length=50)
    # primary = models.BooleanField(default=False)

    def __str__(self):
        return self.value


class Post(models.Model):
    """Post model."""

    title = models.CharField(max_length=200)
    slug = models.CharField(max_length=200)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    illustration = models.CharField(
        max_length=200,
        blank=True,
        null=True,
    )
    description = models.TextField()
    body = models.TextField()
    tags = models.ManyToManyField(Tag)
    posted_date = models.DateTimeField(auto_now=True)
    reading_time = models.IntegerField(default=5)

    @property
    def comments(self):
        """Return the comments to this post."""
        return Comment.objects.all().filter(post=self.id, replyto=None)

    @property
    def get_date(self):
        return get_date(self.posted_date)

    def __str__(self):
        return self.title


class Comment(models.Model):
    """Comment model."""

    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    replyto = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='+'
    )
    body = models.TextField('Commentaire')
    published_date = models.DateTimeField('Date de publication')
    likes = models.IntegerField(default=0)
    user_liked = models.ManyToManyField(User)

    @property
    def replies(self):
        """Return the replies to this comment."""
        return Comment.objects.all().filter(replyto=self.id)

    @property
    def get_date(self):
        return get_date(self.published_date)

    def __str__(self):
        """Convert this object into a string."""
        return self.body


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    image = models.ImageField(
        upload_to='profile',
        blank=True
    )

    def __str__(self):
        return self.user.__str__()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
