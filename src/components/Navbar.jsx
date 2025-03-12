import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 place-content-evenly'>
      <NavLink className="m-1 text-lg" to={"/"}>
        Home
      </NavLink>
      
      <NavLink className="m-1 text-lg" to={"/pastes"}>
        pastes
      </NavLink>
      
    </div>
  )
}

export default Navbar
