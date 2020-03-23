from django.contrib import admin
from .models import Tag, Post, Comment, Profile


# Site header
admin.site.site_header = "Administration du blog"

# Admin models
@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    """This is the admin model for Post."""
    exclude = ('author',)
    list_display = ('title', 'slug', 'posted_date')
    list_filter = ('posted_date',)
    ordering = ['-posted_date']

    def get_queryset(self, request):
        query = super(PostAdmin, self).get_queryset(request)
        return query.filter(author=request.user)


# Register Models
admin.site.register(Tag)
admin.site.register(Comment)
admin.site.register(Profile)
