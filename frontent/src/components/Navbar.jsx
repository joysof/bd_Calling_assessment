import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {


  const { user, logout ,backend_url} = useContext(AuthContext);
  const navigate = useNavigate();
  const sendVerificationOtp =  async() =>{
    try {
      axios.defaults.withCredentials = true
      const userId = localStorage.getItem("userId");
      console.log( "user id is ", userId)
      const { data } = await axios.post(backend_url + '/api/user/verify-otp',{userId},{
        headers: { "Content-Type": "application/json" }
      })
      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message)        
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* left site  */}
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          MyApp
        </Link>

        {/* right site  */}
        <div className="flex items-center gap-6">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-purple-600 transition">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-purple-600 transition">Register</Link>
            </>
          ) : (
            <>
                {!user.isAccountVerified && <button onClick={sendVerificationOtp} className='py-1 px-3 capitalize cursor-pointer bg-purple-600 text-white rounded-md hover:bg-purple-700 transition'>verify email</button>
                }
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-600 cursor-pointer text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
