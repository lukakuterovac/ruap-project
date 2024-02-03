from django.db.models.signals import post_migrate
from django.dispatch import receiver

from .models import populate_database


@receiver(post_migrate)
def on_post_migrate(sender, **kwargs):
    if sender.name == 'api':
        populate_database()
