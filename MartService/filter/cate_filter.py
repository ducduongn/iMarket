from rest_framework import filters
from MartService.models import Category

class IsParentNull(filters.BaseFilterBackend):
    """
    Filter that only allows users to see their own objects.
    """
    queryset = Category.objects.all()

    def filter_queryset(self, request, queryset, view):
        return queryset.filter(owner=request.user)