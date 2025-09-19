import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LogForm from "./components/form.jsx";
import SignUpForm from "./components/signup.jsx";
import NotePage from "./components/note.jsx";
import Navbar from "./components/navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthRoute from "./components/AuthRoute.jsx";
import Goodbye from "./components/Goodbye.jsx";
import NotesList from "./components/NotesList.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={
            <AuthRoute>
              <LogForm />
            </AuthRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthRoute>
              <SignUpForm />
            </AuthRoute>
          }
        />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <NotesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/note"
          element={
            <ProtectedRoute>
              <NotePage />
            </ProtectedRoute>
          }
        />

        <Route path="/goodbye" element={<Goodbye />} />
      </Routes>
    </Router>
  );
}

export default App;
