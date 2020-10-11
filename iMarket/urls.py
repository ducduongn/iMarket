from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include("account.api_urls")),
    path('', include('frontend.urls')),
    path('customer/', include("customer.urls")),
    path('', include('customer.urls')),
]
