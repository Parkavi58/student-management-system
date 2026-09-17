# TEST CASES – STUDENT MANAGEMENT SYSTEM

## 1. Introduction

This document describes the test cases used to verify the functionality of
the Student Management System.

The testing covers:

- Create Student
- Read All Students
- Read One Student
- Update Student
- Delete Student
- Search Student
- Server-side validation

The REST API endpoints were tested using Postman.

---

# 2. Testing Objectives

The objectives of testing are:

1. To verify that student records can be created successfully.
2. To verify that student records can be retrieved successfully.
3. To verify that existing student records can be updated.
4. To verify that student records can be deleted.
5. To verify that student search functionality works correctly.
6. To verify that invalid data is rejected by the server.
7. To verify that the API returns appropriate HTTP status codes.
8. To verify that CRUD operations work correctly with the database.

---

# 3. Testing Environment

| Component | Details |
|---|---|
| Frontend | React / Vite |
| Backend | Django |
| API Framework | Django REST Framework |
| Database | SQLite |
| API Testing Tool | Postman |
| Development Environment | Visual Studio Code |
| Backend URL | http://127.0.0.1:8000 |
| API Base URL | http://127.0.0.1:8000/api/students/ |

---

# 4. Test Case Summary

| Test ID | Test Case | Method | Expected Status | Result |
|---|---|---|---|---|
| TC01 | Create Student | POST | 201 Created | PASSED |
| TC02 | Read All Students | GET | 200 OK | PASSED |
| TC03 | Read One Student | GET | 200 OK | PASSED |
| TC04 | Update Student | PUT | 200 OK | PASSED |
| TC05 | Delete Student | DELETE | 204 No Content | PASSED |
| TC06 | Search Student | GET | 200 OK | PASSED |
| TC07 | Empty Name Validation | POST | 400 Bad Request | PASSED |

---

# 5. TC01 – Create Student

## Test Objective

To verify that a new student can be created successfully.

## HTTP Method

```text
POST