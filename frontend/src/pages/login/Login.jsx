import React, { useState , useContext , useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../../context/UserContext'

import {UserGroupIcon} from '@heroicons/react/16/solid'
import Input from '../../components/Input/Input'
import  './login.css'
import Button from '../../components/Button/Button'


function Login() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] =useState("")
    const navigate = useNavigate()
    const { currentUser , setCurrentUser} = useContext(userContext)
   
useEffect(()=>{
  if(currentUser?.token){
    navigate('/directory/dashboard')
  }
},[])
    const handleChange = (e)=> {
      setUserData( prev => {
        return {...prev, [e.target.name]: e.target.value}
      })
    }
  console.log(userData)

    const handleLogin = async (e)=> {
        e.preventDefault();
        setError("")
     try {
      const   response = await axios.post('http://localhost:8800/users/login', userData);
      const user = await response.data.userInfo;
      setCurrentUser(user)
      navigate('/directory/dashboard')

     } catch (err) {
        setError(err.response.data.message)
     }
      
    }
  return (
    <div className='login_wrapper'>
       <div className="login_content">
       <UserGroupIcon className='icon'/>
       <h1> Hi Login directory</h1>
        <form onSubmit={handleLogin}>
            <Input type="email" placeholder="Enter email " name="email" value={userData.email} onChange={handleChange} />
            <Input type="password" placeholder="Enter password " name="password" value={userData.password} onChange={handleChange} />
            {error && <p>{error}</p>}
            <Button text="Login" />
        </form>
        <p>Dont have an account? <Link to='/directory/signup'>Register</Link></p>
       </div>
    </div>
  )
}

export default Login