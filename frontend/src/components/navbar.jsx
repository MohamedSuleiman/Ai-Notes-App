import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken"); // check login

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/goodbye");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 50px",
        backgroundColor: "#222",
        color: "#fff",
      }}
    >
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          AI Notes
        </Link>
      </div>

      <div>
        {token ? (
          <>
            <Link to="/notes" style={{ marginRight: "15px", color: "#fff" }}>
              My Notes
            </Link>
            <Link to="/note" style={{ marginRight: "15px", color: "#fff" }}>
              Create Note
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 12px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#ff4d4d",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: "15px", color: "#fff" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "#fff" }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
