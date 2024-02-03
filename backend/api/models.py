import csv
from io import StringIO

import requests
from django.core.exceptions import ValidationError
from django.db import models

DATASET_URL = 'https://ruapprojectws0986254674.blob.core.windows.net/azureml-blobstore-6f4d0d41-88a2-4809-bf54-695717023bf3/UI/2024-02-03_201148_UTC/apple_quality_cleaned_01scale.csv'


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
