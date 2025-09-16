const appUrl = import.meta.env.VITE_APP_URL
import { NavLink, useNavigate} from 'react-router-dom';
import {ToastContainer, toast, Bounce} from 'react-toastify'
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react'

const Navbar = () => {
  const navigate = useNavigate();
  const {isLoggedIn, setIsLoggedIn}= useContext(AuthContext);

   const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return; // stop if canceled
    
      // Call your backend logout route
      try{
      const res = await fetch(`${appUrl}/user/logout`, {
        method: "GET",
        credentials: "include", // important if using cookies
      });

     if(res.ok){
       // Update React state
       console.log("I am here");
      setIsLoggedIn(false);
      console.log("I am here man")
      toast.success("Logged Out Success")
      console.log("I am here too")
      // Redirect to home
      navigate("/");
     }
    }
     catch(err){
      console.log(err);
      toast.error("Logout Failed!")
     }
    
  };



  return (
    <>
      <nav className="rounded-b-lg flex justify-between items-center bg-orange-400 text-black h-14 mb-2">
      <div className="ml-4"></div>
      <div className="flex items-center gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded-lg p-2 mr-2 transition-colors duration-200 ${
              isActive ? "bg-stone-50" : "hover:bg-gray-300"
            }`          }
        >
          Home
        </NavLink>
        <NavLink
          to="/new"
          className={({ isActive }) =>
            `rounded-lg p-2 mr-2 px-3 transition-colors duration-200 ${
              isActive ? "bg-stone-50" : "hover:bg-gray-300"
            }`
          }
        >
          New
        </NavLink>
        {
          !isLoggedIn && (
            <NavLink
          to="/signup"
          className={({ isActive }) =>
            `rounded-lg p-2 mr-2 transition-colors duration-200 ${
              isActive ? "bg-stone-50" : "hover:bg-gray-300"
            }`
          }
        >
          SignUp
        </NavLink>
          )
        }
        { !isLoggedIn && (
          <NavLink
          to="/login"
          className={({ isActive }) =>
            `rounded-lg p-2 mr-2 transition-colors duration-200 ${
              isActive ? "bg-stone-50" : "hover:bg-gray-300"
            }`
          }
        >
          LogIn
        </NavLink>
        )}


        
        {
            isLoggedIn && (

            <button
            onClick = {handleLogout}
              className="rounded-lg p-2 m-2 hover:bg-gray-300 transition-all duration-300 "
              >
              Logout
            </button>
          )
        }
        
      </div>
    </nav>

    
    </>
  );
};

export default Navbar;