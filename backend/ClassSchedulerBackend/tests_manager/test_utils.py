import json


def decode_content(content):
    return json.loads(content.decode('utf-8'))