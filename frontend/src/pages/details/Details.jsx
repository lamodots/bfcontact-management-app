import React, {useEffect, useState, useContext} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';
import { userContext } from '../../context/UserContext';
import './details.css';




function Details() {
  const {id }= useParams()

const [isLoading, SetIsLoading]= useState(false);
const [contact, setContact] = useState({})
const {currentUser} = useContext(userContext)
const navigate = useNavigate()


useEffect(()=>{
  if(!currentUser?.token){
      navigate('/directory/login')
  }

},[])

useEffect(()=> {
  const getSingleContact = async ()=> {
    SetIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:8800/contacts/${id}`)
      const responseData = await response.data.data
      setContact(responseData)
     


    } catch (error) {
      console.log(error)
    }

    SetIsLoading(false)


  }

  getSingleContact()
}, [])

if(isLoading){
  return <Loader />
}

  return (
    <div className='details_container'>
      <Link to="/directory/dashboard">Back</Link>
        <div className="details_content">
      <h1>Contact Info </h1>
          <div className="head_data">
            <h3>
            Full Name: <span>{contact.firstname}</span>
            
             
            </h3>
          </div>
          <div className="meta_data">
            <p>Middle Name:   <span>{contact.middlename}</span> </p>
            <p>Sur Name:  <span>{contact.surname}</span> </p>
            <p>Phone: <span>{contact.phoneNo}</span> </p>
            <p>Company: <span>{contact.company}</span></p>
          </div>
        </div>
    </div>
  )
}

export default Details