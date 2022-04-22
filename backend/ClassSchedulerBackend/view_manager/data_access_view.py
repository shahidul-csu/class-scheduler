
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, mixins
from django.core.exceptions import FieldError
from django.contrib.auth.hashers import make_password
from .view_utils import *


class DataAccessView(mixins.CreateModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     viewsets.GenericViewSet):
    serializer_class = None
    queryset = None
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    model = None
    lookup_field = "id"
    url_conf = {
        "get": "get_models",
        "post": "add_models",
        "put": "update_models",
        "delete": "delete_models"
    }

    @classmethod
    def as_view(cls, actions=None, **kwargs):
        return super().as_view(cls.url_conf)

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        data = self.request.data
        if self.lookup_field not in data:
            raise ValueError("Missing id parameter")
        obj = queryset.get(pk=self.request.data[self.lookup_field])
        self.check_object_permissions(self.request, obj)
        return obj

    def filter_models(self, **filter_params):
        return list(map(
            lambda item: dict(self.get_serializer().to_representation(item)),
            self.model.objects.filter(**filter_params)
        ))

    def parse_query_params(self):
        def parse_query_param(param):
            if len(param) > 1:
                raise ValueError("Feature is not supported, please pass one argument per field.")
            else:
                return param[0]

        return {k: parse_query_param(v) for k, v in dict(self.request.query_params).items()}

    def update_models(self, request, *args, **kwargs):
        data = self.request.data
        if "password" in data:
            self.request.data["password"] = make_password(self.request.data["password"])
        return super().update(request, *args, **kwargs)

    def get_models(self, *args, **kwargs):
        try:
            data = self.filter_models(**self.parse_query_params())
            res = get_response(data, status=200)
        except (TypeError, FieldError, ValueError) as e:
            data = {"error": str(e)}
            res = get_response(data, status=400)
        return res

    def add_models(self, *args, **kwargs):
        try:
            print(self.model.objects.filter(**self.request.data).exists())
            if len(self.filter_models(**self.request.data)) > 0:
                raise ValueError("Duplicate detected, cannot add module object!")
            data = self.create(self.request).data
            res = get_response(data, status=200)
        except (FieldError, ValueError, Exception) as e:
            data = {"error": str(e)}
            res = get_response(data, status=400)
        return res

    def delete_models(self, *args, **kwargs):
        try:
            if len(self.parse_query_params()) == 0 and len(self.request.data) == 0:
                raise FieldError("Missing parameters")
            elif len(self.request.data) == 0:
                filter_settings = self.parse_query_params()
            elif len(self.parse_query_params()) == 0:
                filter_settings = self.request.data
            else:
                filter_settings = self.parse_query_params()
            data = self.filter_models(**filter_settings)
            self.model.objects.filter(**filter_settings).delete()
            res = get_response(data, status=200)
        except FieldError as e:
            data = {"error": str(e)}
            res = get_response(data, status=400)
        return res