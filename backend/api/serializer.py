from todo.models import Todo
from rest_framework import serializers
from django.contrib.auth.models import User


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ["id", "user", "title", "status", "created_at"]
        extra_kwargs = {
            "user": {"read_only": True},
        }


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self):

        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError({"error": "P1 and P2 should be same!"})

        if User.objects.filter(email=self.validated_data["email"]).exists():
            raise serializers.ValidationError({"error": "Email already exists!"})

        account = User(
            email=self.validated_data["email"], username=self.validated_data["username"]
        )
        account.set_password(password)
        account.save()

        return account
