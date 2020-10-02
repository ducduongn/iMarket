from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers

from knox import views as knox_views

from .api import SignUpAPI, LoginAPI, UserAPI, ActivateAccountAPI

app_name = 'api_account'


urlpatterns = [
    path('', include('knox.urls')),
    path('signup', SignUpAPI.as_view()),
    path('login', LoginAPI.as_view()),
    path('user', UserAPI.as_view()),
    path('logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('logoutall', knox_views.LogoutAllView.as_view(),
         name='knox_logoutall'),
    path('activate', ActivateAccountAPI.as_view(), name='activate'),
]
