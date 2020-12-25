from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.contrib import auth
import django
from django.contrib.auth.models import PermissionsMixin

# from .leadmanager import settings

class Car(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=20)
    brand = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'car'


class UserManager(BaseUserManager):
    def create_user(self, email, password, commit=True, **extra_fields, ):
        print('asdfa')
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            email=self.normalize_email(email)
        )
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        if commit:
            user.save()
        return user
        
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")
    
        user = self.model(
            email=self.normalize_email(email),
            password = password
        )
        user.set_password(password)
        user.admin = True
        user.staff = True
        user.active = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    # Delete not use field
    objects = UserManager()

    username = None
    email = models.EmailField(unique=True, db_index=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    is_active = models.BooleanField('active', default=True)
    is_admin = models.BooleanField('admin', default=False)
    is_verified = models.BooleanField('verified', default=True)
    

    password = models.CharField(max_length=100)
   
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    ordering = ('created',)

    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def get_short_name(self):
        return self.email

    def get_full_name(self):
        return self.email

    def __unicode__(self):
        return self.email

    class Meta:
        db_table = 'User'

# class Profile(models.Model):
#     GENDER = (
#         ('M', 'Homme'),
#         ('F', 'Femme'),
#     )

#     user = models.OneToOneField(settings.AUTH_USER_MODEL)
#     first_name = models.CharField(max_length=120, blank=False)
#     last_name = models.CharField(max_length=120, blank=False)
#     gender = models.CharField(max_length=1, choices=GENDER)
    

#     def __unicode__(self):
#         return u'Profile of user: {0}'.format(self.user.email)


#     def create_profile(sender, instance, created, **kwargs):
#         if created:
#             Profile.objects.create(user=instance)
#     post_save.connect(create_profile, sender=User)


#     def delete_user(sender, instance=None, **kwargs):
#         try:
#             instance.user
#         except User.DoesNotExist:
#             pass
#         else:
#             instance.user.delete()
#     post_delete.connect(delete_user, sender=Profile)
