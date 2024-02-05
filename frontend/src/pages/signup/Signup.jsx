import { useState } from 'react'

import axios from 'axios'
import {UserGroupIcon} from '@heroicons/react/16/solid'
import Input from '../../components/Input/Input'
import  './signup.css'
import Button from '../../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
const [error, setError] = useState('');
const navigate = useNavigate()

   
    const handleChange = (e)=> {
        setUserData(prev => {
          return {...prev , [e.target.name]: e.target.value}
        })
    }
 
    const handleSignup =  async (e)=> {
        e.preventDefault()
      
        try {
        
          const response = await  axios.post('http://localhost:8800/users/create', userData)
          const newUser = await response.data.data;
          
          if(!newUser){
         
            setError('Couldnt register user, try again')
          }
         
         navigate('/directory/login')
        } catch (err) {
          setError(err.response.data.message)
        }
       
    }
  return (
    <div className='login_wrapper'>
      {error && <p>{error}</p>}
       <div className="login_content">
       <UserGroupIcon className='icon'/>
       <h1>Create directory </h1>
        <form onSubmit={handleSignup}>
            <Input type="email" placeholder="Enter email " name="email" value={userData.email} onChange={handleChange} />
           
            <Input type="password" placeholder="Enter password " name="password" value={userData.password} onChange={handleChange} />
            <Button text="Register" />
        </form>
        <p>Dont have an account? <Link to='/directory/login'>Login</Link></p>
       </div>
    </div>
  )
}

export default SignUp