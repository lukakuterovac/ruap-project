# Generated by Django 5.0.2 on 2024-02-12 21:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_applequality_submit_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applequality',
            name='submit_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 2, 12, 21, 50, 34, 235106, tzinfo=datetime.timezone.utc)),
        ),
    ]