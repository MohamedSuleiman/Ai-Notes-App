import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Navigate to="/notes" replace />;
  }

  return children;
}
