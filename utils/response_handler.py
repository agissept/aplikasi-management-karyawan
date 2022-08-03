import json


def response_success(data=None, data_name=None, message=None, response_code=200):
    json_data = json.loads(json.dumps(data, default=str))
    response = {
        'success': True,
    }
    if message is not None:
        response['message'] = message

    if data is not None and data_name is not None:
        response['data'] = {
            data_name: json_data
        }

    if data is not None and data_name is None:
        response['data'] = json_data

    return response, response_code


def response_error(message, response_code):
    return {
               'success': False,
               'message': message
           }, response_code
