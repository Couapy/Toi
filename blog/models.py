from django.db import models
from django.contrib.auth.models import User
from .functions import get_date, illustration_directory_path
from ckeditor.fields import RichTextField

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
    illustration = models.ImageField(
        upload_to=illustration_directory_path,
        blank=True,
        null=True
    )
    description = models.TextField()
    body = RichTextField(config_name="post")
    tags = models.ManyToManyField(Tag)
    posted_date = models.DateTimeField(auto_now_add=True)
    reading_time = models.IntegerField(default=5)

    @property
    def comments(self):
        """Return the comments to this post."""
        return Comment.objects.all().filter(post=self.id, replyto=None)

    @property
    def get_date(self):
        return get_date(self.posted_date)

    def save(self, *args, **kwargs):
        """Control the save."""
        if self.id is None:
            this = self
        else:
            this = Post.objects.get(id=self.id)

        try:
            if this.illustration != self.illustration:
                this.illustration.delete(save=False)
        except Exception:
            pass

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Comment(models.Model):
    """Comment model."""

    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
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
    published_date = models.DateTimeField(
        'Date de publication',
        auto_now_add=True
    )
    modified = models.BooleanField(default=False)
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
