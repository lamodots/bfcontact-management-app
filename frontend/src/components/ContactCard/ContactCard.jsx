import React from 'react'
import {PencilSquareIcon, TrashIcon} from '@heroicons/react/20/solid';
import './contact-card.css'
import { Link } from 'react-router-dom';
function ContactCard({id, firstname, company, phoneNo, handleDelete}) {

  return (
    <div className='contact_card'>
        <div className="info">
            <div className="name"><Link to={`/directory/c/${id}`} >{firstname}</Link></div>
            <div className="company">{company}</div>
            <div className="company">{phoneNo}</div>
        </div>
        <div className="action">
           <Link to={`/directory/edit_contact/${id}`}>  <PencilSquareIcon className='action_icon' /></Link>
          <TrashIcon  className='action_icon' onClick={()=> handleDelete(id)}/>
        </div>
        
    </div>
  )
}

export default ContactCard