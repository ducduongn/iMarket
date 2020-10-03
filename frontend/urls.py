from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('auth/<path>', views.index),
    path('detail', views.index),
]
