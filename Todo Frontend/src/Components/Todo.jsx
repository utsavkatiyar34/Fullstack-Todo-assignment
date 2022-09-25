import React, { useEffect } from "react";
import "../Styles/todo.css";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToDoError,
  addToDoLoading,
  addToDoSuccess,
  deleteToDoError,
  deleteToDoLoading,
  deleteToDoSuccess,
  getToDoError,
  getToDoLoading,
  getToDoSuccess,
  patchToDoError,
  patchToDoLoading,
  patchToDoSuccess,
} from "../Store/actions";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export const Todo = () => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.todo);

  let reqGet = () => {
    dispatch(getToDoLoading());
    axios({
      method: "get",
      url: "http://localhost:7000/todo",
      headers: {
        authtoken:tok,
      },
    })
      .then((res) => {
        dispatch(getToDoSuccess(res.data.todo));
      })
      .catch((err) => {
        dispatch(getToDoError());
      });
  };
  useEffect(() => {
    reqGet();
  }, []);
 
  let handleTodo = () => {
    dispatch(addToDoLoading());
    axios({
      method: "post",
      url: "http://localhost:7000/addtodo",
      data: {
        task_name: text,
        pending: true,
        tag: type,
      },
      headers: {
        authtoken:tok,
      },
    })
      .then((res) => {
        dispatch(addToDoSuccess(res.data.todo));
      })
      .catch((err) => {
        dispatch(addToDoError());
      });
   
  };
  const handleToggle = (id, status) => {
    dispatch(patchToDoLoading());
    axios({
      method: "post",
      url: "http://localhost:7000/updatestatus",
      data: {
        task_name:id,
        pending: status,
      },
      headers: {
        authtoken:tok,
      },
      
    })
      .then((res) => {
        dispatch(patchToDoSuccess(res.data.todo));
      })
      .catch((err) => {
        dispatch(patchToDoError());
      });
  };
  const handleDelete = (id) => {
    dispatch(deleteToDoLoading());
    axios({
      method: "delete",
      url: "http://localhost:7000/removetodo",
      data: {
        task_name:id,
      },
      headers: {
        authtoken:tok,
      }
    })
      .then((res) => {
        dispatch(deleteToDoSuccess(res.data.todo));
      })
      .catch((err) => {
        dispatch(deleteToDoError());
      });
  };
  let tok=localStorage.getItem("authtoken");
  return (
    <>
      <div style={{ padding: "1.5vw", width: "100%", textAlign:'center'}}>
        
        <FormControl sx={{ m: 1, width:"25vw"}}>
        <InputLabel id="outlined-basic"></InputLabel>
        <TextField
         id="outlined-basic"
         label="Task"
         variant="outlined" 
         value={text}
         onChange={(e) => setText(e.target.value)}
         type="text"
         required
         />
        </FormControl>
         <br></br>
        <FormControl sx={{ m: 1, width:"25vw"}}>
       <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
       <Select
        sx={{color:"#900C3F",borderColor:"#900C3F"}}
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={type}
        label="Type"
        placeholder="Select Type"
        onChange={(e) => setType(e.target.value)}
        >
       <MenuItem value={"Personal"}>Personal</MenuItem>
       <MenuItem value={"Official"}>Official</MenuItem>
       <MenuItem value={"Others"}>Others</MenuItem>
      </Select>
      </FormControl>
      <br></br>
        <Button
          onClick={handleTodo}
          variant="solid"
          sx={{
            color: "white",
            backgroundColor: "#900C3F",
            borderColor: "#900C3F",
            height:"3vw",
            "&:hover": { backgroundColor: "#a0522d" },
          }}
        >
          Add Task
        </Button>
        
      </div>
     {data.map((el) => {
        return (
          <div
            style={{
              border: "4px solid #900C3F",
              marginBottom: "1vw",
              padding: "1vw",
              width: "50%",
              marginLeft: "25%",
              textAlign:'center'
            }}
          >
            <div
              style={{
                color: "brown",
                fontSize: "2vw",
                textTransform: "uppercase",
                fontWeight: "600",
              }}
            >
              {el.task_name}
            </div>
            <div
            style={{
              color: "brown",
              fontSize: "1.5vw",
              textTransform: "uppercase",
              fontWeight: "500",
            }}
            >
              {el.tag}
            </div>
            <div>
              <Button
                onClick={() => handleToggle(el.task_name, el.pending)}
                variant="solid"
                sx={{
                  color: "white",
                  backgroundColor: "#900C3F",
                  borderColor: "#900C3F",
                  width: "8vw",
                  height:"2vw",
                  marginRight: ".5vw",
                  "&:hover": { backgroundColor: "#a0522d" },
                }}
              >
                {el.pending ? "Pending" : "Done"}
              </Button>
              <Button
                onClick={() => handleDelete(el.task_name)}
                variant="solid"
                sx={{
                  color: "white",
                  backgroundColor: "#900C3F",
                  borderColor: "#900C3F",
                  height:"2vw",
                  width: "8vw",
                  "&:hover": { backgroundColor: "#a0522d" },
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })} 
    </>
  );
};
