import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

export default function LogForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [generalMessage, setGeneralMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setGeneralMessage("");

    let newErrors = {};

    if (!username) {
      newErrors.username = "Username is required.";
    } else if (!usernameRegex.test(username)) {
      newErrors.username =
        "3-20 characters, only letters, numbers, underscores, or dashes.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!strongPasswordRegex.test(password)) {
      newErrors.password =
        "Must be 8+ chars with uppercase, lowercase, number, and special character.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3400/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setGeneralMessage(data.errorMessage || "Invalid username or password.");
      } else {
        setGeneralMessage("✅ Login successful! Redirecting...");
        localStorage.setItem("accessToken", data.accessToken);

        setTimeout(() => {
          navigate("/notes");
        }, 1200);
      }
    } catch (error) {
      setGeneralMessage("⚠️ Network error. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Login</h2>
      <form className="login-container" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className={errors.username ? "input-error" : ""}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p style={{ color: "red", fontSize: "0.9em" }}>{errors.username}</p>
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={errors.password ? "input-error" : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "0.9em" }}>{errors.password}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {generalMessage && (
        <p
          style={{
            color: generalMessage.includes("success") ? "green" : "red",
            marginTop: "10px",
          }}
        >
          {generalMessage}
        </p>
      )}

      <p style={{ marginTop: "20px" }}>
        Not registered? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}
