from django.urls import path
from . import views


urlpatterns = [
    path('checkout', views.index),
    path('browse/', views.index),
    path('browse/<int>', views.index),
    path('c/', views.index),
    path('cart/', views.index),
    path('auth/<path>', views.index),
    path('detail/<int>', views.index),
    path('detail/', views.index),
    path('', views.index),
]
