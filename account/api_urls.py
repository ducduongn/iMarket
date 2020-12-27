from django.conf.urls import url
from django.urls import path, include
from rest_framework import routers

from knox import views as knox_views

from .api import SignUpAPI, LoginAPI, UserViewSet, ActivateAccountAPI, UserAPI
from .api import ListCreateCarView, UpdateDeleteCarView

app_name = 'api_account'

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    url('auth', include('knox.urls')),
    url(r'^', include(router.urls)),
    path('user', UserAPI.as_view()),
    path('login', LoginAPI.as_view(), name="login"),
    path('signup', SignUpAPI.as_view(), name="signup"),
    path('logout', knox_views.LogoutView.as_view(), name="logout"),
    path('logoutall', knox_views.LogoutAllView.as_view(), name="logoutall"),
    path('activate', ActivateAccountAPI.as_view(), name="activate"),
]
