import {Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";

function App() {
  return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1 className="text-center mt-20 text-3xl font-bold">Welcome Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>

         </div>
  );
}

export default App;
