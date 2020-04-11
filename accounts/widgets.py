from django import forms
from django.utils.safestring import mark_safe


# My widgets

class ImagePreviewWidget(forms.widgets.FileInput):
    class Media:
        """Add media with this widget."""
        css = {
            'all': ('styles/imagePreview.css',)
        }
        js = ('scripts/imagePreview.js',)

    def render(self, name, value, attrs=None, **kwargs):
        input_html = super().render(name, value, attrs, **kwargs)
        id = attrs['id']
        img_html = mark_safe(f'<br><br><img src="{value.url}" id="{id}_preview" class="preview-widget"/>')
        script = mark_safe(f'<script>listenImagePreview("#{id}", "#{id}_preview")</script>')
        return f'{input_html}{img_html}{script}'
