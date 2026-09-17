from datetime import date, timedelta
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Student

class StudentAPITests(APITestCase):
    def payload(self, **overrides):
        data = {
            "roll_number": "23CSE001",
            "name": "Test Student",
            "email": "test@example.com",
            "phone": "9876543210",
            "department": "Computer Science and Engineering",
            "year": 2,
            "gender": "Female",
            "date_of_birth": "2007-01-01",
        }
        data.update(overrides)
        return data

    def test_create_student(self):
        response = self.client.post("/api/students/", self.payload(), format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Student.objects.count(), 1)

    def test_read_students(self):
        Student.objects.create(**self.payload())
        response = self.client.get("/api/students/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_student(self):
        student = Student.objects.create(**self.payload())
        response = self.client.patch(
            f"/api/students/{student.id}/",
            {"name": "Updated Student"},
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        student.refresh_from_db()
        self.assertEqual(student.name, "Updated Student")

    def test_delete_student(self):
        student = Student.objects.create(**self.payload())
        response = self.client.delete(f"/api/students/{student.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Student.objects.filter(id=student.id).exists())

    def test_invalid_email(self):
        response = self.client.post(
            "/api/students/",
            self.payload(email="not-an-email"),
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_year(self):
        response = self.client.post(
            "/api/students/",
            self.payload(year=6),
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_duplicate_roll_number(self):
        Student.objects.create(**self.payload())
        response = self.client.post(
            "/api/students/",
            self.payload(email="second@example.com"),
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
