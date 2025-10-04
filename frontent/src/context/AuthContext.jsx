import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const backend_url = import.meta.env.VITE_BACKEND_URL

   useEffect(() => {

    const fetchUser = async () => {

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        try {
          const res = await axios.get(`${backend_url}/api/user/me`);
          if (res.data.success) {
            setUser(res.data.user);
            console.log("this success", res);
          } else {
            setUser(null);
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            console.log("this error");
          }
        } catch (err) {
          console.error(err);
          setUser(null);
          localStorage.removeItem("token");
          delete axios.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [backend_url]);

  const login = async (email, password) => {
    const res = await axios.post(backend_url + "/api/user/login", { email, password });
    if (res.data.success) {
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    }
    return res.data;
  };


  const register = async (name, email, password) => {
    const res = await axios.post(backend_url + "/api/user/register", { name, email, password });
    if (res.data.success) {
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    }
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register,loading , logout, setUser ,backend_url}}>
      {children}
    </AuthContext.Provider>
  );
};
