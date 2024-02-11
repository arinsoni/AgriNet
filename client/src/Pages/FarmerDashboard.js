import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const FarmerDashboard = () => {
  const initialFolderList = [];
  const [folderList, setFolderList] = useState(initialFolderList);

  useEffect(() => {
    getFolders();
  }, []);

  const getFolders = async () => {
    try {
      const response = await fetch(`http://localhost:6001/api/farmer/folders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setFolderList(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        {folderList.map((item, index) => (
          <Grid item key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Click Me
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FarmerDashboard;
