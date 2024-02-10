import React from 'react';


import { useFormik } from "formik";
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const response = await fetch("http://localhost:6001/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();
      if(json.success){
        localStorage.setItem("token", json.token);
        navigate("/admin/dashboard")
      }
    },
  });

  const {
    handleSubmit,
    getFieldProps,
    handleChange,
    values,
    handleBlur,
  } = formik;


  return (
    <form onSubmit={handleSubmit}>

      <TextField
        {...getFieldProps("email")}
        onChange={handleChange}
        onBlur={handleBlur}
        id="username"
        name="username"
        value={values.username}
        label="Username"
        fullWidth
        size="small"
        color="primary"
        variant="outlined"
        margin="normal" 
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        {...getFieldProps("password")}
        onChange={handleChange}
        onBlur={handleBlur}
        id="password"
        name="password"
        label="Password"
        fullWidth
        size="small"
        color="primary"
        variant="outlined"
        margin="normal" 
        InputLabelProps={{
          shrink: true, 
        }}
      />
      <button
        type="submit"
        className="btn btn-primary"
        style={{
          background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
          borderRadius: "5px",
          border: "none",
          width: "100%",
          paddingTop: "10px",
          paddingBottom: "10px",
          marginTop: "10px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>

  );
};

export default AdminLogin;