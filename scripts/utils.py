from django.conf import settings
import os

from MartService.models import Category
import json

DATA_DIR = os.path.join(settings.BASE_DIR, 'static/testdata')

def load_json(name):
    with open(os.path.join(DATA_DIR, name), 'r') as f:
        return json.load(f)