from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

from phonenumber_field.modelfields import PhoneNumberField

from .managers import CustomUserManager


# Custom User với email làm trường chính
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('Email address'), unique=True)
    is_verified = models.BooleanField(_('Verified'), default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


# Hồ sơ của user. Sprint 1 càng đơn giản càng tốt
class UserProfile(models.Model):
    # Foreign key
    user = models.OneToOneField(get_user_model(), verbose_name=_(
        "Account"), on_delete=models.CASCADE)
    # SĐT
    # phone_number = PhoneNumberField(_("Phone number"))
    # Địa chỉ. Giờ mới chỉ là VAR CHAR cho đơn giản dể test.
    # location = models.CharField(max_length=140)

    # Các lựa chọn cho giới tính
    # class Gender(models.IntegerChoices):
    #     MALE = 1
    #     FEMALE = 2
    #     OTHER = 3
    #     UNKNOWN = -1
    # gender = models.IntegerField(choices=Gender.choices)
    
    def __unicode__(self):
        return u'Profile of user: %s' % self.user

# @receiver(post_save, sender=User)
# def create_or_update_user_profile(sender, instance, created, **kwargs):
#     if created:
#         UserProfile.objects.create(user=instance)
#     instance.profile.save()