
import './App.css'
import Login from './pages/Login/Login'
import SignUp from './pages/Signup/Signup'
import {Outlet} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import { useEffect } from 'react'






function App() {

useEffect(()=> {
  if(location.pathname ==="/"){
    location.href="http://localhost:5174/directory/login"
  }
  if(location.pathname ==="/directory"){
    location.href="http://localhost:5174/directory/login"
  }
}, [])
  return (
    <>
 

<Outlet>
  <SignUp/>
  <Login />
  <Dashboard />
</Outlet>

       
       

    </>
  )
}

export default App
