# Generated by Django 3.0.4 on 2020-03-18 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_auto_20200308_1649'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='published_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Date de publication'),
        ),
        migrations.AlterField(
            model_name='post',
            name='posted_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
