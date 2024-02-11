import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Link } from "react-router-dom"; // Import useHistory hook

const AdminDashboard = () => {
  const initialFolderList = [];
  const [folderList, setFolderList] = useState(initialFolderList);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

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

  const createFolder = async () => {
    try {
      const response = await fetch(`http://localhost:6001/api/admin/create-folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, desc }),
      });
      const json = await response.json();
      setFolderList([...folderList, json]); 
      setOpenDialog(false);  
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
      >
        Add Folder
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={createFolder} color="primary">Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
