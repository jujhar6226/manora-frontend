import React from "react";
import NoteCard from "./NoteCard";

function Dashboard({
  handleLogout,
  search,
  setSearch,
  setShowForm,
  showForm,
  title,
  setTitle,
  content,
  setContent,
  handleAddOrUpdate,
  editingId,
  filteredNotes,
  handleEdit,
  handleDelete,
}) {
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
          <NoteCard
            key={note.id}
            note={note}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;