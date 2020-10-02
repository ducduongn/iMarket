from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_text
import requests
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk) + six.text_type(timestamp) +
            six.text_type(user.is_active)
        )


account_activation_token = TokenGenerator()


def check_recaptcha(request):
    captcha_response = request.data.get('captcha_value')
    if captcha_response is None:
        return False
    data = {
        'secret':  settings.ReCAPTCHA_SECRET,
        'response': captcha_response
    }
    r = requests.post(
        'https://www.google.com/recaptcha/api/siteverify', data)
    return r.json()['success']


def get_uid_token_verify(user):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    verify_token = account_activation_token.make_token(user)
    return uid, verify_token


def send_verify_mail(request, user):
    # Gen token và gửi email
    current_site = get_current_site(request)
    mail_subject = 'Activate your account.'
    uid, verify_token = get_uid_token_verify(user)
    message = render_to_string('user/acc_active_email.html', {
        'user': user,
        'domain': current_site.domain,
        'uid': uid,
        'token': verify_token,
    })
    to_email = user.email
    email = EmailMessage(
        mail_subject, message, to=[to_email]
    )
    email.send()


def get_verify_link(request, user):
    uid, verify_token = get_uid_token_verify(user)
    return reverse('api_account:activate')+f'?uid={uid}&token={verify_token}'


def get_user_data(request):
    data = {
        'first_name': request.data.get('firstName'),
        'last_name': request.data.get('lastName'),
        'email': request.data.get('email'),
        'password': request.data.get('password')
    }
    return data


def activate(uidb64, token):
    """
    Kích hoạt tài khoản dựa trên uid và token\n
    Error codes:\n
    -1: Uid hoac token khong duoc cung cap\n
    -2: Khong decode duoc uid\n
    -3: Uid khong tuong ung voi user nao\n
    -4: Token khong dung voi User\n
    1 : User da duoc verify truoc do
    """
    if uidb64 is None or token is None:
        return -1, None
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))  # Decode uid
        user = get_user_model().objects.get(pk=uid)  # get user từ uid
    except(TypeError, ValueError, OverflowError):
        return -2, None
    except(get_user_model().DoesNotExist):
        return -3, None
    if user is not None and account_activation_token.check_token(user, token):
        if user.is_verified:
            return 1, user
        user.is_verified = True
        user.save()
        return 0, user
    else:
        return -4, user
