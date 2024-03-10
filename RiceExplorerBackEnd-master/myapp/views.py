import json
from django.http import JsonResponse, HttpResponseBadRequest

def crop_data(request):
    try:
        selected_crop = request.GET.get('crop', None)
        if not selected_crop:
            return HttpResponseBadRequest("Crop type is required.")

        # Load dataset
        with open('villages_data.json') as f:
            villages = json.load(f)

        filtered_villages = [village for village in villages if village['crops'].get(selected_crop, 0) > 0]
        total_area = sum(village['crops'].get(selected_crop, 0) for village in filtered_villages)

        response_data = {
            'villages': filtered_villages,
            'total_area': total_area
        }
        return JsonResponse(response_data)
    except Exception as e:
        return HttpResponseBadRequest(str(e))
