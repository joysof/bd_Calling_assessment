import {Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import Todo from "./pages/Todo.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
 import { ToastContainer } from 'react-toastify';
function App() {
  return (
      <div>
        <ToastContainer   position="top-right"
  // autoClose={3000}
  // hideProgressBar={false}
  // newestOnTop={false}
  // closeOnClick
  // rtl={false}
  // pauseOnFocusLoss
  // draggable
  // pauseOnHover
  // theme="colored"
  // 
  />
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
          <Route
          path="/todos"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
        </Routes>

         </div>
  );
}

export default App;
