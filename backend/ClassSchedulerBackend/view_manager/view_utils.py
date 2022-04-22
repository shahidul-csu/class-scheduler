import json
from json import JSONDecodeError
from django.http import HttpResponse


def get_response(data, headers=None, status=200):
    if headers is None:
        headers = {
            "Access-Control-Allow-Origin": "http://localhost:3000/",
            "Content-Type": "application/json"
        }
    return HttpResponse(json.dumps(data), headers=headers, status=status)


def get_body(request):
    try:
        return json.loads(request.body.decode('utf-8'))
    except JSONDecodeError:
        return get_response(
            data={"error": "Failed to convert to json: {}".format(request.body.decode('utf-8'))},
            status=400
        )