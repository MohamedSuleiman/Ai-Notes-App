import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

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

    if (!usernameRegex.test(username)) {
      setErrorMessage(
        "Username must be 3-20 characters and contain only letters, numbers, underscores, or dashes."
      );
      return;
    }

    try {
      const signupResponse = await fetch("http://localhost:3400/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        setErrorMessage(signupData.errorMessage || "Signup failed");
        return;
      }

      const loginResponse = await fetch("http://localhost:3400/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setErrorMessage(loginData.errorMessage || "Login failed after signup");
        return;
      }

      localStorage.setItem("accessToken", loginData.accessToken);

      setSuccessMessage("Signup & login successful!");

      navigate("/notes");
    } catch (error) {
      console.error(error);
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}>
      <h2>Create Account</h2>
      <form className="login-container" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            id="username"
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
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
      {successMessage && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMessage}</p>
      )}

      <p style={{ marginTop: "20px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
