# Generated by Django 4.2.6 on 2023-10-18 11:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import eventproject.events.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0004_rename_author_event_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='user',
            field=models.ForeignKey(default=eventproject.events.models.get_default_author, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]