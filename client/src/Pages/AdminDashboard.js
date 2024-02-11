import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link, useHistory, useNavigate } from "react-router-dom"; // Import useHistory hook
import Folder from "./Folder";

const AdminDashboard = () => {
  const initialFolderList = [];
const [folderList, setFolderList] = useState(initialFolderList);

  const navigate = useNavigate();

  useEffect(() => {
    getFolders();
  }, []);

  const getFolders = async () => {
    try {
      const response = await fetch(`http://localhost:6001/api/admin/folders`, {
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
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      {!folderList.length ? (
        <Typography variant="h6">No folders found</Typography>
      ) : (
        folderList.map((item, index) => (
          <Grid item key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
                <Link
                  to={`/admin/folders/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" sx={{ mt: 2 }}>
                    View Folder
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
  
};

export default AdminDashboard;
