"""domestic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from expenses import views as exp_views

from jwt_auth.views import (
    GoogleTokenObtainPairView,
    TokenObtainPairView,
    TokenRefreshView,
)

from .hook import webhook

from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'categories', exp_views.CategoryViewSet)
router.register(r'items', exp_views.ItemViewSet)
router.register(r'users', exp_views.UserViewSet)
router.register(r'orgusers', exp_views.OrgUsersViewSet, base_name='orgusers')
router.register(r'organizations', exp_views.OrganizationViewSet)
router.register(r'expense', exp_views.ExpenseViewSet)
router.register(r'income', exp_views.IncomeViewSet)
router.register(r'feedback', exp_views.FeedbackViewSet)

urlpatterns = [
    url(r'^ulala/', admin.site.urls),
    url(r'^$', include('expenses.urls')),
    url(r'^expenses/', include('expenses.urls')),
    url('', include('social_django.urls', namespace='social')),
    # url(r'^login/', login, name='login'),
    url(r'^identity/', exp_views.identity, name='identity'),
    url(r'^webhook/', webhook, name='webhook'),

    # JWT Authentication
    url(r'token/$', TokenObtainPairView.as_view()),

    url(r'token/google/$', GoogleTokenObtainPairView.as_view()),

    url(r'token/refresh/$', TokenRefreshView.as_view()),
]
urlpatterns += router.urls
