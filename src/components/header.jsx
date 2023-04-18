import React from 'react'
import Logo from '../assets/Logo_noback.png'; 
const Header = () => {
  return (
    <div className='header' >
          <div className='Logo_container'>
               <img src={Logo} alt="Company Logo" />
          </div>
          <div className="game_name"><h3>Desc Softlab Snake Game </h3></div>
    </div>
  )
}

export default Header