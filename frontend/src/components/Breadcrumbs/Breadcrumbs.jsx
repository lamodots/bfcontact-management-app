import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {ChevronRightIcon} from '@heroicons/react/20/solid'
import './breadcrumbs.css'
function Breadcrumbs() {
    const location = useLocation()
    let currentLink = " "
    const crums = location.pathname.split('/').filter(crumb=> crumb !== '')
    .map(crumb => {
      
        currentLink=+ `/${crumb}`

        return (

            <div className='crumb' key={crumb}>
                <Link to={currentLink}>{crumb}</Link>
            </div>
        )
    })
  return (
    <div className='breadcrumbs'>{crums} </div>
  )
}

export default Breadcrumbs