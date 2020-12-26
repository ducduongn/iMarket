from rest_framework.fields import ListField

class StringSplitArrayField(ListField):
    """
    String representation of an array field.
    """
    def __init__(self, *args, transform_func=None, **kwargs,):
        self.transfrom_func = transform_func
        super(StringSplitArrayField, self).__init__(*args, **kwargs)

    def to_representation(self, data):
        data = data.split(",")  # convert string to list
        if self.transfrom_func:
            data = map(self.transfrom_func, data)
        return super().to_internal_value(data)

    def to_internal_value(self, obj):
        obj = super().to_representation(obj)
        # convert list to string
        return ",".join([str(element) for element in obj])
        
