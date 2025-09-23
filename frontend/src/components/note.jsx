import { useState } from "react";

export default function NotePage() {
  const [noteContent, setNoteContent] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("accessToken");

  const handleSave = async () => {
    if (!noteContent) {
      setMessage("Please write a note first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3400/api/createNote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: noteContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.errorMessage || "Failed to save note.");
      } else {
        setMessage("Note saved successfully!");
        setNoteContent("");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", color: "#fff" }}>
      <h2>Write a Note</h2>
      <textarea
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        rows={10}
        placeholder="Write your note here..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "none",
          marginBottom: "15px",
          fontSize: "14px",
        }}
      ></textarea>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4caf70",
            cursor: "pointer",
          }}
        >
          Save Note
        </button>
      </div>

      {message && <p style={{ color: "#ff6b6b" }}>{message}</p>}
    </div>
  );
}
