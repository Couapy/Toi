# Generated by Django 3.0.4 on 2020-03-23 17:42

import blog.functions
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0009_auto_20200323_1525'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='illustration',
            field=models.ImageField(blank=True, null=True, upload_to=blog.functions.illustration_directory_path),
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(blank=True, upload_to=blog.functions.profile_directory_path),
        ),
    ]
