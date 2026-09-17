# Student Management System

A complete CRUD-based full-stack web application built according to the supplied SOP.

## Technology Stack
- Frontend: React + Vite + CSS
- Backend: Python + Django + Django REST Framework
- Database: SQLite
- API testing: Postman
- Version control: Git/GitHub

## Features
- Create student
- View all students
- View one student
- Update student
- Delete student with confirmation
- Search students
- Client-side validation
- Server-side validation
- Duplicate email/roll-number handling
- REST API
- Responsive UI
- Clear success/error messages
- SQLite database
- Django admin support
- Automated backend API tests

## Project Structure
student_management_system/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── student_api/
│   └── students/
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
├── postman/
│   └── Student_Management_System.postman_collection.json
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── TEST_CASES.md
│   └── DATABASE_DESIGN.md
├── .gitignore
└── README.md

## Requirements
- Python 3.10+
- Node.js 18+
- npm

## Backend Setup - Windows PowerShell

Open PowerShell inside `backend`:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend:
http://127.0.0.1:8000/

Admin:
http://127.0.0.1:8000/admin/

## Frontend Setup

Open another terminal inside `frontend`:

```powershell
npm install
npm run dev
```

Frontend:
http://localhost:5173/

The frontend is configured to use:
http://127.0.0.1:8000/api/students/

## API Endpoints

| Operation | Method | Endpoint |
|---|---|---|
| Create | POST | /api/students/ |
| Read All | GET | /api/students/ |
| Read One | GET | /api/students/{id}/ |
| Update | PUT/PATCH | /api/students/{id}/ |
| Delete | DELETE | /api/students/{id}/ |

## Sample Student JSON

```json
{
  "roll_number": "23CSE001",
  "name": "Parkavi S",
  "email": "parkavi@example.com",
  "phone": "9876543210",
  "department": "Computer Science and Engineering",
  "year": 2,
  "gender": "Female",
  "date_of_birth": "2007-08-01"
}
```

## Run Backend Tests

```powershell
python manage.py test
```

## Git

```powershell
git init
git add .
git commit -m "Initial Student Management System"
```

Do not commit the `venv`, SQLite database, `.env`, or build artifacts.
