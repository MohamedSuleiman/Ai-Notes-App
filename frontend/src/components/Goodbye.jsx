import { Link } from "react-router-dom";

export default function Goodbye() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px", color: "#fff" }}>
      <h1>👋 Goodbye!</h1>
      <p>You have been logged out successfully.</p>
      <p>
        <Link to="/login" style={{ color: "#4cafef" }}>
          Login again
        </Link>
      </p>
    </div>
  );
}
