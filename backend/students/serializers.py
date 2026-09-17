from datetime import date
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "id", "roll_number", "name", "email", "phone",
            "department", "year", "gender", "date_of_birth",
            "created_at", "updated_at"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_roll_number(self, value):
        value = value.strip().upper()
        if not value:
            raise serializers.ValidationError("Roll number is required.")
        return value

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Name must contain at least 2 characters.")
        return value

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number must contain exactly 10 digits.")
        return value

    def validate_year(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Year must be between 1 and 5.")
        return value

    def validate_date_of_birth(self, value):
        if value >= date.today():
            raise serializers.ValidationError("Date of birth must be in the past.")
        return value
