import React from "react";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FarmerLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const response = await fetch("http://localhost:6001/api/Farmer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.token);
        navigate("/farmer/dashboard"); // Navigate to the farmer dashboard
      }
    },
  });

  const { handleSubmit, getFieldProps, handleChange, values, handleBlur } =
    formik;

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
          shrink: true,
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

export default FarmerLogin;