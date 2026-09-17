import { useEffect, useMemo, useState } from "react";
import { createStudent, deleteStudent, getStudents, updateStudent } from "./api";

const emptyForm = {
  roll_number: "",
  name: "",
  email: "",
  phone: "",
  department: "Computer Science and Engineering",
  year: 1,
  gender: "Female",
  date_of_birth: "",
};

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(true);

  const totalStudents = students.length;
  const departments = useMemo(
    () => new Set(students.map((s) => s.department)).size,
    [students]
  );

  async function loadStudents(query = search) {
    try {
      setLoading(true);
      const data = await getStudents(query);
      setStudents(data);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents("");
  }, []);

  function validate() {
    if (!form.roll_number.trim()) return "Roll number is required.";
    if (!form.name.trim() || form.name.trim().length < 2) return "Enter a valid name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email.";
    if (!/^\d{10}$/.test(form.phone)) return "Phone number must contain 10 digits.";
    if (!form.department) return "Department is required.";
    if (!form.year || Number(form.year) < 1 || Number(form.year) > 5) return "Year must be 1 to 5.";
    if (!form.gender) return "Gender is required.";
    if (!form.date_of_birth) return "Date of birth is required.";
    return "";
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validate();

    if (validationError) {
      setMessage({ type: "error", text: validationError });
      return;
    }

    try {
      if (editingId) {
        await updateStudent(editingId, { ...form, year: Number(form.year) });
        setMessage({ type: "success", text: "Student updated successfully." });
      } else {
        await createStudent({ ...form, year: Number(form.year) });
        setMessage({ type: "success", text: "Student added successfully." });
      }

      resetForm();
      await loadStudents();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  }

  function editStudent(student) {
    setEditingId(student.id);
    setForm({
      roll_number: student.roll_number,
      name: student.name,
      email: student.email,
      phone: student.phone,
      department: student.department,
      year: student.year,
      gender: student.gender,
      date_of_birth: student.date_of_birth,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeStudent(student) {
    const confirmed = window.confirm(
      `Delete ${student.name} (${student.roll_number})? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await deleteStudent(student.id);
      setMessage({ type: "success", text: "Student deleted successfully." });
      await loadStudents();
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSearch(event) {
    event.preventDefault();
    await loadStudents(search);
  }

  return (
    <div className="app">
      <header className="hero">
        <div>
          <p className="eyebrow">FULL-STACK CRUD APPLICATION</p>
          <h1>Student Management System</h1>
          <p className="subtitle">
            Manage student records with React, Django REST Framework and SQLite.
          </p>
        </div>
      </header>

      <main className="container">
        {message.text && (
          <div className={`alert ${message.type}`}>
            <span>{message.text}</span>
            <button onClick={() => setMessage({ type: "", text: "" })}>×</button>
          </div>
        )}

        <section className="stats">
          <div className="stat-card">
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
          </div>
          <div className="stat-card">
            <span>Departments</span>
            <strong>{departments}</strong>
          </div>
          <div className="stat-card">
            <span>CRUD Status</span>
            <strong>Active</strong>
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>{editingId ? "Edit Student" : "Add Student"}</h2>
              <p>All required fields are validated before submission.</p>
            </div>
            {editingId && (
              <button className="secondary" onClick={resetForm}>Cancel Edit</button>
            )}
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Roll Number
              <input name="roll_number" value={form.roll_number} onChange={handleChange} placeholder="23CSE001" />
            </label>

            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} placeholder="Student name" />
            </label>

            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="student@example.com" />
            </label>

            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} maxLength="10" placeholder="10 digit number" />
            </label>

            <label>
              Department
              <select name="department" value={form.department} onChange={handleChange}>
                <option>Computer Science and Engineering</option>
                <option>Artificial Intelligence and Data Science</option>
                <option>Information Technology</option>
                <option>Electronics and Communication Engineering</option>
                <option>Electrical and Electronics Engineering</option>
                <option>Mechanical Engineering</option>
              </select>
            </label>

            <label>
              Year
              <select name="year" value={form.year} onChange={handleChange}>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
              </select>
            </label>

            <label>
              Gender
              <select name="gender" value={form.gender} onChange={handleChange}>
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Date of Birth
              <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} />
            </label>

            <div className="form-actions">
              <button className="primary" type="submit">
                {editingId ? "Update Student" : "Add Student"}
              </button>
              <button className="secondary" type="button" onClick={resetForm}>Clear</button>
            </div>
          </form>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Student Records</h2>
              <p>Search, edit or delete saved records.</p>
            </div>
            <form className="search" onSubmit={handleSearch}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, roll no, email..."
              />
              <button className="primary" type="submit">Search</button>
              <button
                className="secondary"
                type="button"
                onClick={() => {
                  setSearch("");
                  loadStudents("");
                }}
              >
                Reset
              </button>
            </form>
          </div>

          <div className="table-wrapper">
            {loading ? (
              <div className="empty">Loading students...</div>
            ) : students.length === 0 ? (
              <div className="empty">No student records found.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td><strong>{student.roll_number}</strong></td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>
                      <td>{student.gender}</td>
                      <td>{student.date_of_birth}</td>
                      <td className="actions">
                        <button className="edit" onClick={() => editStudent(student)}>Edit</button>
                        <button className="delete" onClick={() => removeStudent(student)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>

      <footer>
        Student Management System • CRUD • REST API • SQLite
      </footer>
    </div>
  );
}

export default App;
