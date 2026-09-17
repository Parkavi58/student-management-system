from django.db import migrations, models
import django.core.validators

class Migration(migrations.Migration):
    initial = True
    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Student",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("roll_number", models.CharField(max_length=20, unique=True)),
                ("name", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone", models.CharField(
                    max_length=10,
                    validators=[django.core.validators.RegexValidator(
                        message="Phone number must contain exactly 10 digits.",
                        regex="^[0-9]{10}$"
                    )]
                )),
                ("department", models.CharField(max_length=100)),
                ("year", models.PositiveSmallIntegerField(
                    validators=[
                        django.core.validators.MinValueValidator(1),
                        django.core.validators.MaxValueValidator(5)
                    ]
                )),
                ("gender", models.CharField(
                    choices=[("Male", "Male"), ("Female", "Female"), ("Other", "Other")],
                    max_length=10
                )),
                ("date_of_birth", models.DateField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["roll_number"]},
        ),
    ]
