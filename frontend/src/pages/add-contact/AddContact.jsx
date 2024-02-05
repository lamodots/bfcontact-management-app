import React, { useState, useContext, useEffect} from 'react'
import {UserPlusIcon} from '@heroicons/react/16/solid'
import Input from '../../components/Input/Input'
import  './add-contact.css'
import Button from '../../components/Button/Button'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { userContext } from '../../context/userContext'


function AddContact() {
    const [userData, setUserData] = useState({
        firstname: '',
        middlename: '',
        surname:'',
        company:'',
        phoneNo:''
    })

    const [error, setError] = useState(" ")
    const {currentUser} = useContext(userContext)
    const navigate = useNavigate()

useEffect(()=>{
  if(!currentUser?.token){
    navigate('/directory/login')
  }
}, [])


    const handleChange = (e)=> {
      e.preventDefault()
      setUserData(prev => {
        return {...prev, [e.target.name]: e.target.value}
      })

      
    }

    const handleCreateContact = async (e)=>{
      e.preventDefault()
      if(userData.company === "" || userData.middlename ==="" || userData.firstname==="" || userData.surname==="" || userData.phoneNo ===""){
        return setError('Filled can not be empty')
      }
      if(isNaN(userData.phoneNo)){
        return  setError('Text not allowed as phone Number!')
      }

      setError(" ")

      
            try {
             
                const response = await axios.post('http://localhost:8800/contacts/create', userData , {
                  headers: {
                    Authorization: `Bearer ${currentUser.token}`
                  }
                })
                if(response.status !== 'ok'){
                  setError('Contact not created')
                }
                navigate('/directory/dashboard')
              
             
            } catch (err) {
              setError(err.response.data.message)
            }
    }

   
   
  return (
    <div className='contact_wrapper'>
   
      <p>{error}</p>
       <div className="contact_content">
       <UserPlusIcon className='icon'/>
       <h1>Add Contact </h1> <Link to="/directory/dashboard">Back</Link>
        <form onSubmit={handleCreateContact}>
            <Input type="text" placeholder="Enter firstname "  name="firstname" value={userData.firstname} onChange={handleChange} />
            <Input type="text" placeholder="Enter middlename " name="middlename"  value={userData.middlename} onChange={handleChange} />
            <Input type="text" placeholder="Enter surname " name="surname"  value={userData.surname} onChange={handleChange} />
            <Input type="text" placeholder="Enter company "  name="company" value={userData.company} onChange={handleChange} />
            <Input type="text" placeholder="Enter phone"  name="phoneNo" value={userData.phoneNo} onChange={handleChange} />
            <Button text="Add contact" />
        </form>
       </div>
    </div>
  )
}

export default AddContact;