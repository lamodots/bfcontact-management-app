
import './App.css'
import Login from './pages/Login/Login'
import SignUp from './pages/Signup/Signup'
import {Outlet} from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'






function App() {


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
