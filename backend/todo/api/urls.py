from django.urls import path, include
from rest_framework import routers
from .views import TodoViewSet

router = routers.SimpleRouter()
router.register('todo', TodoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
