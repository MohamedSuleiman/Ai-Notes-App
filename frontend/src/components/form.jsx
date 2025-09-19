import { useState } from "react";
import "../style.css";

export default function LogForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!strongPasswordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (!username) {
      setErrorMessage("Username is required.");
      return;
    }

    if (!usernameRegex.test(username)) {
      setErrorMessage(
        "Username must be 3-20 characters and contain only letters, numbers, underscores, or dashes (no spaces)."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3400/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.errorMessage || "Login failed");
      } else {
        setSuccessMessage("Login successful!");
        localStorage.setItem("accessToken", data.accessToken);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      console.err(error);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Login</h2>
      <form className="login-container" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
      {successMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
      )}

      <p style={{ marginTop: "20px" }}>
        Not registered? <a href="/signup">Create an account</a>
      </p>
    </div>
  );
}
