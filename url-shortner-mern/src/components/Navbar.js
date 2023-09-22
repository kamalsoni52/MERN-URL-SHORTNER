import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser, selectAccessToken } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import { logOut } from '../features/authSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUser)
  const token = useSelector(selectAccessToken)
  const navigate = useNavigate()
  
  const handleLogOut = () =>{
    console.log("logoutclicked")
    dispatch(logOut());
    navigate("/");

  }


  const navbar = token ?
    (
      <>
        <Link className="link" to="/">{username}</Link>
        <Link className="link" to="/analytics">Analytics</Link>
        <button className='btn nav-btn' onClick={handleLogOut}>Logout</button>
      </>
    )
    :
    (
      <>

        <Link className="link" to="/signup">Register</Link>
        <Link className="link btn nav-btn nav-btn-login" to="/login">Login</Link>
      </>
    )

  return (
    <div className='navbar pad'>
      <span>
        <Link className="link" to="/"> <h2>Shortner</h2> </Link ></span >
      <div className='navLink'>
        {navbar}
      </div>
    </div >
  )

}

export default Navbar