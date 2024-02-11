import React from 'react';

import { useFormik } from "formik";
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      const { username, password, email } = values;
      const response = await fetch("http://localhost:6001/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      const json = await response.json();
      if (json.success) {
        navigate("/admin-login");
      } else {
        console.error("Registration failed:", json.error);
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
        {...getFieldProps("username")}
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
        type="password"
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
        {...getFieldProps("email")}
        onChange={handleChange}
        onBlur={handleBlur}
        id="email"
        name="email"
        value={values.email}
        label="Email"
        fullWidth
        size="small"
        color="primary"
        variant="outlined"
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "10px" }}
      >
        Register
      </Button>
    </form>
  );
};

export default AdminRegister;
