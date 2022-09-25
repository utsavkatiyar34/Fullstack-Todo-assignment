import React, { useState, useEffect } from "react";
import "../Styles/Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { logOut, getloginToDoError, getloginToDoLoading, getloginToDoSuccess } from "../Store/actions";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const Sidebar = () => {
  const { token } = useSelector((state) => state.login);
  const {user}=useSelector((state)=>state.profile);
  const { data } = useSelector((state) => state.todo);
  const dispatch=useDispatch();
  let handleLogout = () => {
    localStorage.removeItem("authtoken");
     dispatch(logOut());
  };

  let handleLoggedin=()=>{
    dispatch(getloginToDoLoading());
  axios({
  method: "get",
  url: "http://localhost:7000/loggeduser",
  headers: {
    authtoken:tok,
  },
  }).then((res) => {
    dispatch(getloginToDoSuccess(res.data));
  })
  .catch((err) => {
    alert(err.response.data.message);
    dispatch(getloginToDoError());
  });
  }
  useEffect(() => {
    handleLoggedin();
   }, []);
   let tok=localStorage.getItem("authtoken");
  if(!tok){
    return <Navigate to="/login"/>
  }
  return (
    <>
      <div className="sidebar">
        <h3>User Details</h3>
          <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>+91 {user.mobile_number}</div>
          <br></br>
          <div>Total Tasks: {data.length}</div>
          </div>
        <Button
          onClick={handleLogout}
          variant="solid"
          sx={{
            color: "white",
            backgroundColor: "#900C3F",
            width: "50%",
            borderColor: "#900C3F",
            height: "2vw",
            marginTop:'2vw',
            "&:hover": { backgroundColor: "#a0522d" },
          }}
        >
          Logout
        </Button>
      </div>
    </>
  );
};
