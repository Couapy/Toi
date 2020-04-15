from django import template
from .. import models

# Declare register
register = template.Library()


@register.inclusion_tag('blog/gabarits/tags.html')
def tags():
    tags = models.Tag.objects.all()
    return {'tags': tags}
