import React from 'react'
import "../Styles/Navbar.css";
import{NavLink}from "react-router-dom";
import { useSelector } from 'react-redux';
export const Navbar = () => {
  const { token } = useSelector((state) => state.login); 
  let tok=localStorage.getItem("authtoken");
  return (
        <nav className="navbar">
        <div className='logonav'>
        <NavLink to="/" className='logonav-nav'> &#60; ToDo-List &#47; &#62;</NavLink>
        </div>
        {!token && !tok ? (<div className='menu'>
         <ul>
                <NavLink to="/signup"  className='menulinks'>Signup</NavLink>
        </ul>
        <ul>
                <NavLink to="/login" className='menulinks'>Login</NavLink>
        </ul>
        </div>):(<></>)}
      </nav>
  )
}
