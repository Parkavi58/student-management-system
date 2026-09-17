# Database Design – Student Management System

## 1. Overview

The Student Management System uses SQLite as the database.

The database stores student information required for creating, viewing,
updating, deleting, and searching student records.

The main entity in the system is:

- Student

---

## 2. Student Entity

The `Student` entity contains the details of each student.

### Student Table

| Field | Description |
|---|---|
| id | Unique identifier for the student |
| roll_number | Unique roll number of the student |
| name | Name of the student |
| email | Email address of the student |
| phone | Phone number of the student |
| department | Department of the student |
| year | Current academic year |
| gender | Gender of the student |
| date_of_birth | Date of birth of the student |

---

## 3. Primary Key

The `id` field is the Primary Key (PK).

It uniquely identifies every student record in the database.

```text
PK = id