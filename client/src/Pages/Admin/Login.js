import React, { useContext } from 'react';
import { useFormik } from "formik";
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import adminContext from '../../context/admin/adminContext';

const AdminLogin = () => {
  const navigate = useNavigate();

  const adminContextValue = useContext(adminContext);
  const setAdminId = adminContextValue.setAdminId;
  


  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:6001/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const json = await response.json();
        if (json.success) {
          localStorage.setItem("token", json.token);
          setAdminId(json.admin._id);

          navigate(`/admin-dashboard/${json.admin._id}`);
        } else {
          console.error("Login failed:", json.message);
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        {...formik.getFieldProps("username")}
        id="username"
        label="Username"
        fullWidth
        size="small"
        color="primary"
        variant="outlined"
        margin="normal"
        autoComplete='off'
      />
      <TextField
        {...formik.getFieldProps("password")}
        type="password"
        id="password"
        label="Password"
        fullWidth
        size="small"
        color="primary"
        variant="outlined"
        margin="normal"
        autoComplete='off'
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "10px" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default AdminLogin;
