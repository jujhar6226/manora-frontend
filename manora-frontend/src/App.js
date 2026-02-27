import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://manora-backend.onrender.com";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // ================= AUTH =================

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      setMessage("Registration successful. Please login.");
      setIsRegistering(false);
      setName("");
      setEmail("");
      setPassword("");
    } catch {
      setMessage("Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password }
      );

      const { user, token } = response.data;

      localStorage.setItem("token", token);
      setUser(user);
      setMessage("");
    } catch {
      setMessage("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setNotes([]);
  };

  // ================= NOTES =================

  const loadNotes = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `${API_URL}/api/notes/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotes(res.data);
  };

  useEffect(() => {
    if (user) loadNotes();
  }, [user]);

  const handleAddOrUpdate = async () => {
    if (!title || !content) return;

    const token = localStorage.getItem("token");

    if (editingId) {
      await axios.put(
        `${API_URL}/api/notes/${editingId}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(
        `${API_URL}/api/notes`,
        {
          user_id: user.id,
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    setTitle("");
    setContent("");
    setEditingId(null);
    setShowForm(false);
    loadNotes();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `${API_URL}/api/notes/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadNotes();
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setShowForm(true);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  // ================= LOGIN / REGISTER UI =================

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f7fb",
        fontFamily: "Segoe UI, sans-serif",
      }}>
        <div style={{
          background: "white",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          width: 350,
        }}>
          <h2 style={{ textAlign: "center" }}>Manora</h2>

          {isRegistering ? (
            <>
              <h3>Register</h3>
              <input style={{ width: "100%", marginBottom: 10, padding: 8 }}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input style={{ width: "100%", marginBottom: 10, padding: 8 }}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input style={{ width: "100%", marginBottom: 10, padding: 8 }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button style={{ width: "100%" }} onClick={handleRegister}>
                Register
              </button>
              <p style={{ cursor: "pointer", marginTop: 10 }}
                 onClick={() => setIsRegistering(false)}>
                Already have account? Login
              </p>
            </>
          ) : (
            <>
              <h3>Login</h3>
              <input style={{ width: "100%", marginBottom: 10, padding: 8 }}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input style={{ width: "100%", marginBottom: 10, padding: 8 }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button style={{ width: "100%" }} onClick={handleLogin}>
                Login
              </button>
              <p style={{ cursor: "pointer", marginTop: 10 }}
                 onClick={() => setIsRegistering(true)}>
                Don't have account? Register
              </p>
            </>
          )}

          <p style={{ color: "red" }}>{message}</p>
        </div>
      </div>
    );
  }

  // ================= DASHBOARD =================

  return (
    <div style={{ background: "#f3f5f9", minHeight: "100vh", padding: 30 }}>
      <div style={{
        background: "white",
        padding: "15px 25px",
        borderRadius: 12,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <h2 style={{ margin: 0 }}>Manora</h2>
        <button
          onClick={handleLogout}
          style={{
            background: "white",
            border: "2px solid #ff4d4f",
            color: "#ff4d4f",
            padding: "6px 14px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 15 }}>
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ddd",
          }}
        />

        <button
          onClick={() => setShowForm(true)}
          style={{
            background: "#4a6cf7",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          + New Note
        </button>
      </div>

      {showForm && (
        <div style={{
          background: "white",
          padding: 20,
          marginTop: 20,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
        }}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", padding: 10, height: 100 }}
          />
          <br />
          <button onClick={handleAddOrUpdate}>
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      )}

      <div style={{
        marginTop: 30,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 20,
      }}>
        {filteredNotes.map((note) => (
          <div key={note.id} style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            <h4>{note.title}</h4>
            <p style={{ color: "#555" }}>{note.content}</p>

            <div style={{
              marginTop: 15,
              display: "flex",
              justifyContent: "space-between",
            }}>
              <button
                onClick={() => handleEdit(note)}
                style={{
                  background: "#f0ad4e",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(note.id)}
                style={{
                  background: "#ff4d4f",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;