from django import forms


class PublishCommentForm(forms.Form):
    """This is the form for publishing a comment."""
    comment = forms.CharField(
        label="Commentaire",
        widget=forms.Textarea
    )
    replyto = forms.IntegerField(
        label="Répondre au commentaire"
    )
