from django.urls import path
from . import views


urlpatterns = [
    path('', views.index),
    path('browse/', views.index),
    path('browse/<int>', views.index),
    path('auth/<path>', views.index),
    path('detail/<int>', views.index),
    path('detail/', views.index),
]
