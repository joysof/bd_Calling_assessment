import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(user);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("http://localhost:5000/api/auth/me");
      if (res.data.success) {
        setProfile(res.data.user);
        setUser(res.data.user);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const res = await axios.put("http://localhost:5000/api/auth/update-profile", {
      name: profile.name,
      email: profile.email,
      id: user.id,
    });
    alert(res.data.message || "Profile Updated");
  };

  const handleChangePassword = async () => {
    const res = await axios.put("http://localhost:5000/api/auth/update-password", {
      currentPassword: prompt("Enter current password"),
      newpassword: newPassword,
    });
    alert(res.data.message);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Profile</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={profile?.name || ""}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            value={profile?.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleUpdate}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleChangePassword}
          className="w-full mt-2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Change Password
        </button>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full mt-4 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
