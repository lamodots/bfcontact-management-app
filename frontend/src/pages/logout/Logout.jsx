import React, {useContext, useEffect} from 'react'
import { userContext } from '../../context/UserContext'
import {useNavigate} from 'react-router-dom'

function Logout() {
    const {setCurrentUser} = useContext(userContext)
    const navigate = useNavigate()
    setCurrentUser(null)
    navigate("/directory/login")
   
  return (
    <></>
  )
}

export default Logout