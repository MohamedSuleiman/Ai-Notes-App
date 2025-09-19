import { useState } from "react";

export default function NotePage() {
  const [noteContent, setNoteContent] = useState("");
  const [summary, setSummary] = useState("");
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
        setSummary("");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      console.error(error);
    }
  };

  const handleSummarize = async () => {
    if (!noteContent) {
      setMessage("Write a note to summarize.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3400/api/notes/summarize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: noteContent }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.errorMessage || "Failed to summarize note.");
      } else {
        setSummary(data.summary);
        setMessage("");
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
            marginRight: "10px",
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4caf70",
            cursor: "pointer",
          }}
        >
          Save Note
        </button>
        <button
          onClick={handleSummarize}
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#2196f3",
            cursor: "pointer",
          }}
        >
          Summarize Note
        </button>
      </div>

      {message && <p style={{ color: "#ff6b6b" }}>{message}</p>}

      {summary && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#333",
            padding: "15px",
            borderRadius: "5px",
          }}
        >
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
