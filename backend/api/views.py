import json

import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import AppleQuality

MODEL_URL = 'http://cda5d693-117a-4f0b-b879-28fc5fc943bf.westeurope.azurecontainer.io/score'


def get_request_parameters(post_request):
    size = post_request.get('Size')
    weight = post_request.get('Weight')
    sweetness = post_request.get('Sweetness')
    crunchiness = post_request.get('Crunchiness')
    juiciness = post_request.get('Juiciness')
    ripeness = post_request.get('Ripeness')
    acidity = post_request.get('Acidity')

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
        post_request = request.POST
        parameters = get_request_parameters(post_request)

        # Ensure all parameters are present
        for value in parameters.values():
            if value is None:
                return JsonResponse(
                        {'error': 'Missing parameter(s)'},
                        status=400
                    )

        # Convert parameter values to [0, 1] range
        for name, value in parameters.items():
            parameters[name] = int(value) / 10

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
