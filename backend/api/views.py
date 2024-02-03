import requests
from django.http import JsonResponse

MODEL_URL = ''


def get_request_parameters(request):
    size = request.GET.get('size')
    weight = request.GET.get('weight')
    sweetness = request.GET.get('sweetness')
    crunchiness = request.GET.get('crunchiness')
    juiciness = request.GET.get('juiciness')
    ripeness = request.GET.get('ripeness')
    acidity = request.GET.get('acidity')

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
def predict(request):
    if request.method == 'GET':
        # Get parameters from the request
        parameters = get_request_parameters(request)

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
        request = {
            "Inputs": {
                "data": [
                    parameters
                ]
            },
            "GlobalParameters": {
                "method": "predict"
            }
        }

        try:
            # Send a POST request to the model API
            response = requests.post(MODEL_URL, request)

            # Check if the request was successful
            if response.status_code == 200:
                # Parse the model's response
                model_output = response.json()
                return JsonResponse({'prediction': model_output})
            else:
                return JsonResponse({'error': 'Model prediction failed'}, status=500)

        except requests.exceptions.RequestException as e:
            return JsonResponse({'error': f'Model API request failed: {e}'}, status=500)

    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
