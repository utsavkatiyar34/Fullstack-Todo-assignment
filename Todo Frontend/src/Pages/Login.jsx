import React, { useState } from 'react'
import '../Styles/Signup.css'
import { Button } from '@mui/material';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { loginToDoError, loginToDoLoading, loginToDoSuccess } from '../Store/actions';
import { Navigate, NavLink } from 'react-router-dom';

export const Login = () => {
  const [email,setEmail]=useState('');
  const [password, setPassword]=useState('');

  const dispatch=useDispatch();
  
  let handleLogin=()=>{
    dispatch(loginToDoLoading());
    axios({
          method: "post",
          url: "http://localhost:7000/login",
          data:{
           email,
           password
          }
    }).then((res) => {
            alert(res.data.message);
            localStorage.setItem("authtoken",res.data.token);
            dispatch(loginToDoSuccess(res.data));
            
          })
          .catch((err) => {
            alert(err.response.data.message);
            dispatch(loginToDoError());
          });
  }
  const { token } = useSelector((state) => state.login); 
  if(token){
    return <Navigate to="/" /> 
  }
  return (
    <div className='signUp'>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inpfields"
          placeholder='Email'
          type="text"
        ></input>
        <input
          required
          value={password}
          name='number'
          onChange={(e) => setPassword(e.target.value)}
          className="inpfields"
          placeholder='Password'
          type="password"
        ></input>
         <Button  variant="solid"
         onClick={handleLogin}
          sx={{
            color: "white",
            backgroundColor: "#900C3F",
            width:'30%',
            borderColor: "#900C3F",
            height:"3vw",
            marginLeft:'auto',
            marginRight:'auto',
            "&:hover": { backgroundColor: "#a0522d" },
          }}>Login</Button>
          <NavLink to="/signup">Not Registered?<br></br> SignUp</NavLink>
     </div>
  )
}
