from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["roll_number", "name", "email", "department"]
    ordering_fields = ["roll_number", "name", "year", "created_at"]
    ordering = ["roll_number"]
