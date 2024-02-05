import './button.css';

function Button({text, handleClick, icon, ...props}) {
  return (
    <><button className='bfe_btn' onClick={handleClick} {...props}>{text} {icon && icon}</button></>
  )
}

export default Button;