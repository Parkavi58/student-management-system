const API_URL = "http://127.0.0.1:8000/api/students/";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data
      ? Object.entries(data)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
          .join(" | ")
      : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export const getStudents = (search = "") => {
  const url = search
    ? `${API_URL}?search=${encodeURIComponent(search)}`
    : API_URL;
  return request(url);
};

export const createStudent = (student) =>
  request(API_URL, { method: "POST", body: JSON.stringify(student) });

export const updateStudent = (id, student) =>
  request(`${API_URL}${id}/`, { method: "PUT", body: JSON.stringify(student) });

export const deleteStudent = (id) =>
  request(`${API_URL}${id}/`, { method: "DELETE" });
