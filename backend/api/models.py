import csv
from io import StringIO

import requests
from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

DATASET_URL = 'https://raw.githubusercontent.com/lukakuterovac/ruap-dataset/master/dataset.csv'


def populate_database():
    if not AppleQuality.objects.exists():
        try:
            # Download the CSV file from the web
            response = requests.get(DATASET_URL)
            response.raise_for_status()  # Check for HTTP errors

            # Parse the CSV content
            csv_data = StringIO(response.text)
            reader = csv.DictReader(csv_data)

            # Process the CSV data
            for row in reader:
                try:
                    AppleQuality.new_from_dict(row)
                except ValidationError as e:
                    print(f"Error creating object: {e}")

        except requests.exceptions.RequestException as e:
            print(f"Error downloading CSV file: {e}")


# Create your models here.
class AppleQuality(models.Model):
    size = models.FloatField()
    weight = models.FloatField()
    sweetness = models.FloatField()
    crunchiness = models.FloatField()
    juiciness = models.FloatField()
    ripeness = models.FloatField()
    acidity = models.FloatField()
    quality = models.IntegerField()
    is_user_submitted = models.BooleanField(default=False)
    submit_date = models.DateTimeField(default=timezone.now())

    def __str__(self):
        return f'{self.pk} | {self.quality}'

    def new_from_dict(dict, is_user_submitted=False):
        AppleQuality.objects.create(
            size=float(dict['Size']),
            weight=float(dict['Weight']),
            sweetness=float(dict['Sweetness']),
            crunchiness=float(dict['Crunchiness']),
            juiciness=float(dict['Juiciness']),
            ripeness=float(dict['Ripeness']),
            acidity=float(dict['Acidity']),
            quality=int(dict['Quality']),
            is_user_submitted=is_user_submitted
        )
