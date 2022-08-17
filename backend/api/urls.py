from django import views
from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("", views.TodoListCreate.as_view(), name="api-home"),
    path("<int:pk>/", views.TodoUpdateDelete.as_view(), name="api-edit-todo"),
    path("user/login/", obtain_auth_token, name="api-login"),
    path("user/signup/", views.registration_view, name="api-signup"),
]
