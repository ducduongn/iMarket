from rest_framework import viewsets
import rest_framework_filters as filters

from .models import Category, Product

class CategoryFilter(filters.FilterSet):
    catid = filters.NumberFilter(field_name='parent', method='include_sub_id')
    name = filters.CharFilter(field_name='name', method='include_sub_name')

    # parent = filters.BooleanFilter(field_name='parent__isnull')
    class Meta:
        model = Category
        fields = {
            'name': ['exact'],
            'parent': filters.ALL_LOOKUPS
        }

    def include_sub_id(self, qs, name, value):
        return qs.filter(**{'parent': value}) | qs.filter(pk=value)

    def include_sub_name(self, qs, name, value):
        if name:
            qs1 = qs.filter(name=value)
            if qs1:
                c = qs1[0]
                catid = c.catid
                if not c.parent:
                    return qs.filter(**{'parent': catid}) | qs1
            return qs1
        return None


class ProductFilter(filters.FilterSet):
    category = filters.RelatedFilter(CategoryFilter, field_name='category', queryset=Category.objects.all())
    class Meta:
        model = Product
        fields = {'name': ['exact', 'in', 'startswith']}