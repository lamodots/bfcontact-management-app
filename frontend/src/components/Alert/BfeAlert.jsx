
import './alert.css'

function BfeAlert({message, alert, size}) {
    
  return (
    <div style={{borderLeftColor:  `${alert==="error" ? "red": alert==="success"? "green": " "}`, width: `${size}%`}} className="alert" >
        {message}
       
    </div>
  )
}

export default BfeAlert