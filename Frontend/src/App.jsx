import { useState, useEffect, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import NewListing from './pages/NewListing'
import Show from './pages/Show'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Edit from './pages/Edit'
import Navbar from './components/Navbar'
import PageNotFound from './components/PageNotFound'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'
import {AuthContext} from './context/AuthContext'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();


  const router = createBrowserRouter([
        
        {
            path : "/",
            element: <Home isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        },
        {
            path: '/new',
            element : 
            <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <NewListing isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                       </ProtectedRoute>
        },
        {
          path :'/show/:id',
          element : <Show isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        },
      {
        path : `/edit/:id`,
        element : <Edit isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      },
      {
        path : '/login',
        element : <Login isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      },
      {
        path : '/signup',
        element : <SignUp isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      },
      {
          path:'*',
          element : <PageNotFound />
        },
       
    ],)



  return (
    <>
      <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <RouterProvider router={router} />
      </AuthContext.Provider>
    
      
      

      {/* Diplaying Loading...*/}
    </>
  );
}

export default App
