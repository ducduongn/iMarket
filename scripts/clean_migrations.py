from django.conf import settings
import os
from django import apps
from django.apps import apps

def rm_migration_app(app_name):
    midir = os.path.join(app_name, 'migrations')
    for f in os.listdir(midir):
        print(os.path.join(midir, f))
        if f[0] == '_': continue
        os.remove(os.path.join(midir, f))

def run(*arg):
    if settings.DATABASES['default']['ENGINE'] == 'django.db.backends.sqlite3':
        # if os.path.exists(settings.DATABASES['default']['NAME']):
        #     os.remove(settings.DATABASES['default']['NAME'])
        rm_migration_app("MartService")
        rm_migration_app("account")
        rm_migration_app("frontend")

