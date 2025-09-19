import { useEffect, useState } from "react";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch("http://localhost:3400/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage(data.errorMessage || "Failed to fetch notes.");
        } else if (data.notes) {
          setNotes(data.notes);
        } else if (data.message) {
          setMessage(data.message);
        }
      } catch (err) {
        console.error(err);
        setMessage("Network error. Please try again.");
      }
    }

    fetchNotes();
  }, [token]);

  return (
    <div style={{ maxWidth: "900px", margin: "50px auto", color: "#fff" }}>
      <h2>Your Notes</h2>

      {message && <p style={{ color: "#ff6b6b" }}>{message}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {notes.map((note) => (
          <div
            key={note._id}
            style={{
              backgroundColor: "#333",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              wordBreak: "break-word",
            }}
          >
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
