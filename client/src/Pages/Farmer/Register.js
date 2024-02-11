import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";

import { useFormik } from "formik";
import { TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FarmerRegister = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: async (values) => {
      const { username, password, email } = values;
      const response = await fetch(
        "http://localhost:6001/api/farmer/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        }
      );

      const json = await response.json();
      if (json.success) {
        navigate("/farmer-login");
      } else {
        console.error("Registration failed:", json.error);
      }
    },
  });

  const { handleSubmit, getFieldProps, handleChange, values, handleBlur } =
    formik;
  const maxWidth = isMobile ? "90vw" : "600px";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "80%",
          maxWidth: maxWidth,
          backgroundColor: "lightblue",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            paddingRight: !isMobile ? "10px" : "",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Farmer Registration
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
                type="password"
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
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default FarmerRegister;
