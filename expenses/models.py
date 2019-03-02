from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone


class Organization(models.Model):
    name = models.CharField(max_length=100)
    owner = models.OneToOneField('AppUser', blank=True, null=True, on_delete=models.CASCADE)
    is_individual = models.BooleanField(default=True)

    def __str__(self):
        return '{}'.format(self.name)


class AppUser(User):
    address = models.CharField(max_length=100, blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    organizations = models.ManyToManyField(Organization, null=True, related_name="users")

    # means user has set up for individual or organizational record
    has_setup = models.BooleanField(default=False)


class CategoryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class Category(models.Model):
    objects = models.Manager()
    valid_objects = CategoryManager()

    organization = models.ForeignKey(
        Organization,
        related_name='categories',
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=50)
    uses = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)
    description = models.CharField(max_length=1000,blank=True)

    def __str__(self):
        return '{} - {}'.format(self.name, self.organization.name)

    def delete(self):
        self.is_deleted = True
        self.save()


class ItemsManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class Item(models.Model):
    objects = models.Manager()
    valid_objects = ItemsManager()

    name = models.CharField(max_length=50)
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE)
    organization = models.ForeignKey(
        Organization, related_name='items', on_delete=models.CASCADE)
    uses = models.IntegerField(default=0)
    description = models.CharField(max_length=1000, blank=True)
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def delete(self):
        self.is_deleted = True
        self.save()


class ExpenseManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)

class Expense(models.Model):
    objects = models.Manager()
    valid_objects = ExpenseManager()

    date = models.DateField('date')
    item = models.ForeignKey(Item, null=True, on_delete=models.CASCADE)
    items = models.TextField(default="")
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    description = models.CharField(max_length=1000,blank=True)
    cost = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)
    created_by = models.ForeignKey('AppUser', null=True, related_name='created', on_delete=models.CASCADE)
    modified_by = models.ForeignKey('AppUser', null=True, related_name='modified', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} {} - {}'.format(self.date.strftime('%Y-%m-%d'), str(self.cost), self.category.name)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_by = self.modified_by
        super().save(*args, **kwargs)

    def delete(self):
        self.is_deleted = True
        self.save()

class Feedback(models.Model):
    user = models.ForeignKey('AppUser', on_delete=models.CASCADE)
    content = models.CharField(max_length=1000)

    def __str__(self):
        return self.user.username


# not used currently
class ItemExpense(models.Model):
    item = models.ForeignKey(Item, null=True, on_delete=models.CASCADE)
    expense = models.ForeignKey(Expense, null=True, on_delete=models.CASCADE)
    quantity = models.FloatField(default=1)
    cost = models.IntegerField(default=0)

    def __str__(self):
        return str(self.expense.date) +" "+ self.item.name+" "+str(self.cost)


class Income(models.Model):
    objects = models.Manager()

    date = models.DateField('date')
    description = models.CharField(max_length=1000,blank=True)
    total = models.IntegerField(default=0)
    is_deleted = models.BooleanField(default=False)
    created_by = models.ForeignKey('AppUser', null=True, related_name='created_income', on_delete=models.CASCADE)
    modified_by = models.ForeignKey('AppUser', null=True, related_name='modified_income', on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} {}'.format(self.date.strftime('%Y-%m-%d'), str(self.total))

    def save(self, *args, **kwargs):
        if not self.id:
            self.created_by = self.modified_by
        super().save(*args, **kwargs)

    def delete(self):
        self.is_deleted = True
        self.save()
