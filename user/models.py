from django.db import models
from django.contrib.auth.models import User


class Organization(models.Model):
    name = models.CharField(max_length=100)
    owner = models.OneToOneField(
        'Profile', blank=True, null=True, on_delete=models.CASCADE)
    is_individual = models.BooleanField(default=True)

    def __str__(self):
        return '{}'.format(self.name)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=100, blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    organizations = models.ManyToManyField(
        Organization,
        null=True,
        related_name="users"
    )
    google_id = models.CharField(max_length=100, blank=True, null=True)

    # means user has set up for individual or organizational record
    has_setup = models.BooleanField(default=False)
