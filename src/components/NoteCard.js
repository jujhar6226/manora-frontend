import React from "react";

function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <h4>{note.title}</h4>
      <p style={{ color: "#555" }}>{note.content}</p>

      <div
        style={{
          marginTop: 15,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => onEdit(note)}
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
          onClick={() => onDelete(note.id)}
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
  );
}

export default NoteCard;