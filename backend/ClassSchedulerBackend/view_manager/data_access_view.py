
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, mixins


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