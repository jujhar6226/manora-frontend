import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";

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

  // ✅ AUTO LOGIN (fix refresh logout)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

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

      // ✅ store both
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
      setMessage("");
    } catch {
      setMessage("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // ✅ important
    setUser(null);
    setNotes([]);
  };

  const loadNotes = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/api/notes/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
          headers: { Authorization: `Bearer ${token}` },
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
          headers: { Authorization: `Bearer ${token}` },
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

    await axios.delete(`${API_URL}/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

  if (!user) {
    return (
      <Auth
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        message={message}
      />
    );
  }

  return (
    <Dashboard
      handleLogout={handleLogout}
      search={search}
      setSearch={setSearch}
      setShowForm={setShowForm}
      showForm={showForm}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      handleAddOrUpdate={handleAddOrUpdate}
      editingId={editingId}
      filteredNotes={filteredNotes}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default App;