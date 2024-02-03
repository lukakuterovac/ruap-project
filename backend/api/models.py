import csv
from io import StringIO

import requests
from django.core.exceptions import ValidationError
from django.db import models

DATASET_URL = 'https://appless9895196980.blob.core.windows.net/azureml-blobstore-93a8863e-5ea7-464f-8e41-215f242e5c08/UI/2024-02-01_170027_UTC/apple_quality_cleaned_01scale.csv'


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
                    AppleQuality.objects.create(
                        size=float(row['Size']),
                        weight=float(row['Weight']),
                        sweetness=float(row['Sweetness']),
                        crunchiness=float(row['Crunchiness']),
                        juiciness=float(row['Juiciness']),
                        ripeness=float(row['Ripeness']),
                        acidity=float(row['Acidity']),
                        quality=int(row['Quality']),
                    )
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

    def __str__(self):
        return f'{self.pk} | {self.quality}'
