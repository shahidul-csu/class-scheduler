from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient
from django.urls import reverse
from backend.ClassSchedulerBackend.models import User
from .test_utils import *


class DAVTestTemplate:
    url_name = None
    add_data = None
    id = None
    update_data = None
    delete_data = None
    field_compare = None
    client_class = APIClient

    data_format = "json"
    user = None
    token = None
    auth_header = None

    @staticmethod
    def setUpTestData(cls):
        credentials = {
            'username': 'admin',
            'password': 'admin'
        }
        cls.user = User.objects.get(username=credentials["username"])
        cls.token = Token.objects.get(user_id=cls.user.pk).key
        cls.auth_header = {"HTTP_AUTHORIZATION": "Token {}".format(cls.token)}

    @classmethod
    def setUpdateData(cls, test_instance):
        print(cls.add_data)
        cls.update_data = cls.add_data
        cls.update_data["id"] = decode_content(cls.__get_response(test_instance).content)[0]["id"]

    @classmethod
    def __get_response(cls, test_instance):
        return test_instance.client.get(
            reverse(cls.url_name),
            format=cls.data_format,
            **cls.auth_header
        )

    @classmethod
    def __add_response(cls, test_instance):
        return test_instance.client.post(
            reverse(cls.url_name),
            format=cls.data_format,
            data=cls.add_data,
            **cls.auth_header
        )

    @classmethod
    def __update_response(cls, test_instance):
        cls.setUpdateData(test_instance)
        return test_instance.client.put(
            reverse(cls.url_name),
            format=cls.data_format,
            data=cls.update_data,
            **cls.auth_header
        )

    @classmethod
    def __delete_response(cls, test_instance):
        return test_instance.client.delete(
            reverse(cls.url_name),
            format=cls.data_format,
            data=cls.delete_data,
            **cls.auth_header
        )

    @classmethod
    def _test_get(cls, test_instance):
        cls.__add_response(test_instance)
        response = cls.__get_response(test_instance)
        print(response.content)
        test_instance.assertEqual(response.status_code, 200)
        test_instance.assertTrue(len(decode_content(response.content)) > 0)

    @classmethod
    def _test_add(cls, test_instance):
        response = cls.__add_response(test_instance)
        print(response.content)
        test_instance.assertEqual(response.status_code, 200)
        test_instance.assertEqual(decode_content(response.content)[cls.field_compare], cls.add_data[cls.field_compare])

    @classmethod
    def _test_update(cls, test_instance):
        try:
            response = cls.__update_response(test_instance)
            print(response.content)
        except IndexError:
            cls.__add_response(test_instance)
            response = cls.__update_response(test_instance)
            print(response.content)
        test_instance.assertEqual(response.status_code, 200)
        test_instance.assertEqual(decode_content(response.content)[cls.field_compare], cls.add_data[cls.field_compare])

    @classmethod
    def _test_delete(cls, test_instance):
        cls.__add_response(test_instance)
        response = cls.__delete_response(test_instance)
        print(response.content)
        test_instance.assertEqual(response.status_code, 200)
        test_instance.assertEqual(decode_content(response.content)[0][cls.field_compare], cls.delete_data[cls.field_compare])