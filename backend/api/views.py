from rest_framework.response import Response
from rest_framework import generics
from todo.models import Todo
from .serializer import TodoSerializer, RegistrationSerializer
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework import status

# Create your views here.


class TodoListCreate(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    # permission_classes = []

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Todo.objects.all().filter(user=self.request.user)


class TodoUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    lookup_field = "pk"


@api_view(["POST"])
def registration_view(request):
    if request.method == "POST":
        serializer = RegistrationSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            account = serializer.save()

            data["response"] = "Registration Successful!"
            data["username"] = account.username
            data["email"] = account.email

            token = Token.objects.get(user=account).key
            data["token"] = token

            # refresh = RefreshToken.for_user(account)
            # data['token'] = {
            #                     'refresh': str(refresh),
            #                     'access': str(refresh.access_token),
            #                 }

        else:
            data = serializer.errors

        return Response(data, status=status.HTTP_201_CREATED)
