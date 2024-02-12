import json

import requests
from django.core.serializers import serialize
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from .models import AppleQuality

MODEL_URL = 'http://cda5d693-117a-4f0b-b879-28fc5fc943bf.westeurope.azurecontainer.io/score'


def get_request_parameters(post_request):
    data = post_request.get('Inputs', {}).get('data', [{}])[0]

    size = data.get('Size')
    weight = data.get('Weight')
    sweetness = data.get('Sweetness')
    crunchiness = data.get('Crunchiness')
    juiciness = data.get('Juiciness')
    ripeness = data.get('Ripeness')
    acidity = data.get('Acidity')

    parameters = {
            'Size': size,
            'Weight': weight,
            'Sweetness': sweetness,
            'Crunchiness': crunchiness,
            'Juiciness': juiciness,
            'Ripeness': ripeness,
            'Acidity': acidity
        }

    return parameters


# Create your views here.
@csrf_exempt
def predict(request):
    if request.method == 'POST':
        # Get parameters from the request
        try:
            data = json.loads(request.body)
            parameters = get_request_parameters(data)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

        #post_request = request.POST
        #parameters = get_request_parameters(post_request)

        # Ensure all parameters are present
        for value in parameters.values():
            if value is None:
                return JsonResponse(
                        {'error': 'Missing parameter(s)'},
                        status=400
                    )

        # Convert parameter values to [0, 1] range
        #for name, value in parameters.items():
           # parameters[name] = int(value) / 10

        # Prepare data to send to the model
        data = {
            "Inputs": {
                "data": [
                    parameters
                ]
            },
            "GlobalParameters": {
                "method": "predict"
            }
        }

        body = str.encode(json.dumps(data))
        headers = {'Content-Type': 'application/json'}

        try:
            # Send a POST request to the model API
            response = requests.post(MODEL_URL, data=body, headers=headers)

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the model's response
                model_output = response.json()
                parameters['Quality'] = model_output['Results'][0]
                AppleQuality.new_from_dict(dict=parameters, is_user_submitted=True)
                return JsonResponse({'prediction': parameters['Quality']})
            else:
                return JsonResponse({'error': 'Model prediction failed'}, status=500)

        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': f'Model API request failed: {e}'}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def data(request):
    try:
        # Retrieve all objects of YourModel
        all_objects = AppleQuality.objects.all().order_by('-submit_date')

        # Serialize the queryset to JSON
        json_data = serialize('json', all_objects)

        # Parse the serialized JSON data
        parsed_data = json.loads(json_data)

        # Return the JSON response
        return JsonResponse({'data': parsed_data})
    except Exception as e:
        return JsonResponse({'error': f'Error retrieving objects: {e}'}, status=500)


@csrf_exempt
def user_data(request):
    try:
        # Retrieve all objects of YourModel
        all_objects = AppleQuality.objects.all().filter(is_user_submitted=True).order_by('-submit_date')

        # Serialize the queryset to JSON
        json_data = serialize('json', all_objects)

        # Parse the serialized JSON data
        parsed_data = json.loads(json_data)

        # Return the JSON response
        return JsonResponse({'data': parsed_data})
    except Exception as e:
        return JsonResponse({'error': f'Error retrieving objects: {e}'}, status=500)


@csrf_exempt
def dataset_data(request):
    try:
        # Retrieve all objects of YourModel
        all_objects = AppleQuality.objects.all().filter(is_user_submitted=False).order_by('-submit_date')

        # Serialize the queryset to JSON
        json_data = serialize('json', all_objects)

        # Parse the serialized JSON data
        parsed_data = json.loads(json_data)

        # Return the JSON response
        return JsonResponse({'data': parsed_data})
    except Exception as e:
        return JsonResponse({'error': f'Error retrieving objects: {e}'}, status=500)


@csrf_exempt
def delete_data(request, id):
    try:
        # Retrieve the model object by its id
        instance = get_object_or_404(AppleQuality, pk=id)

        # Delete the object
        instance.delete()

        return JsonResponse({'message': f'Object with id {id} deleted successfully'})
    except AppleQuality.DoesNotExist:
        return JsonResponse({'error': 'Object not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': f'Error deleting object: {e}'}, status=500)
