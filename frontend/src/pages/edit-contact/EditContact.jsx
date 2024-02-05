import React, { useContext, useEffect, useState } from 'react'
import {UserPlusIcon} from '@heroicons/react/16/solid'
import Input from '../../components/Input/Input'
import  './edit-contact.css'
import Button from '../../components/Button/Button'
import { Link , useParams , useNavigate} from 'react-router-dom'
import { userContext} from '../../context/userContext'
import axios from 'axios'

function EditContact() {
    const [userData, setUserData] = useState({
        firstname: '',
        middlename: '',
        surname:'',
        company:'',
        phoneNo:''
    })
    const [error, setError] =  useState()


    const navigate = useNavigate()
    const { currentUser} = useContext(userContext)

    useEffect(()=>{
      if(!currentUser?.token){
        navigate('/directory/login')
      }
    },[])

const { id} = useParams()

useEffect(()=>{
 try {
  const getContact = async ()=> {
  const response = await axios.get(`http://localhost:8800/contacts/${id}`)
  setUserData(response.data.data)

}

  getContact()

 } catch (error) {
  console.log(error)
 }


},[])



const handleChange = (e)=> {
        e.preventDefault()
        setUserData(prev => {
          return {...prev, [e.target.name]: e.target.value}
        })
    }

const handleSaveEdit = async (e)=> {
  e.preventDefault()
  if(userData.company === "" || userData.middlename ==="" || userData.firstname==="" || userData.surname==="" || userData.phoneNo ===""){
    return setError('Filled can not be empty')
  }
  if(isNaN(userData.phoneNo)){
    return  setError('Text not allowed as phone Number!')
  }

  setError(" ")

  
        try {
         
            const response = await axios.put(`http://localhost:8800/contacts/${id}`, userData )
            if(response.status !== 'ok'){
              setError('Contact not Editted')
            }
            navigate('/directory/dashboard')
          
         
        } catch (err) {
          setError(err.response.data.message)
        }



}
  return (
    <div className='login_wrapper'>
      {error && <p>{error}</p>}
       <div className="login_content">
       <UserPlusIcon className='icon'/>
       <h1>Edit Contact </h1>  <Link to="/directory/dashboard">Back</Link>
        <form onSubmit={handleSaveEdit}>
            <Input type="text" placeholder="Enter firstname " name="firstname" value={userData.firstname} onChange={handleChange} />
            <Input type="text" placeholder="Enter middlename " name="middlename" value={userData.middlename} onChange={handleChange} />
            <Input type="text" placeholder="Enter surname " name="surname" value={userData.surname} onChange={handleChange} />
            <Input type="text" placeholder="Enter company " name="company" value={userData.company} onChange={handleChange} />
            <Input type="text" placeholder="Enter phone" name="phoneNo" value={userData.phoneNo} onChange={handleChange} />
            <Button text="Save" />
        </form>
       </div>
    </div>
  )
}

export default EditContact;