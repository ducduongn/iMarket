from django.contrib.auth import get_user_model

def run(*args):
    User = get_user_model()
    User.objects.create_superuser(email='admin@email.com', password='123456')
