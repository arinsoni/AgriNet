import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from "@mui/material";
import farmerContext from "../context/farmer/farmerContext";

const FarmerDashboard = () => {
  const farmerContextValue = useContext(farmerContext);
  const farmerId = farmerContextValue.farmerId;

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const description = "hello";

  const initialFolderList = [];
  const [folderList, setFolderList] = useState(initialFolderList);


  const [foldersWithAdmin, setFoldersWithAdmin] = useState([]);

  useEffect(() => {
    const fetchAssignedFolders = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the authentication token from localStorage
        const headers = {
          'Content-Type': 'application/json',
          'auth-token': token // Include the authentication token in the headers
        };
  
        const response = await fetch(`http://localhost:6001/api/farmer/assigned-folders/${farmerId}`, {
          headers: headers // Pass the headers object to the fetch request
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        setFoldersWithAdmin(data);
      } catch (error) {
        console.error('Error fetching assigned folders:', error);
      }
    };
  
    fetchAssignedFolders();
  }, []);
  


  console.log(foldersWithAdmin)

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTextChange = (event) => setText(event.target.value);

  const handleFarmerDashboard = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('text', text)
    formData.append('farmerId', farmerId)

    try {
      const response = await fetch('http://localhost:6001/api/farmer/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Image uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
      {!foldersWithAdmin.length ? (
        <Typography variant="h6">No folders found</Typography>
      ) : (
        foldersWithAdmin.map(({ folder, admin }, index) => (
          <Grid item key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {folder.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {folder.desc}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Assigned by: {admin ? admin.name : 'N/A'}
                </Typography>
                <Button onClick={handleOpen}>View More</Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload an image and write a text. Below is a static description for your reference.
          </DialogContentText>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <TextField
            margin="dense"
            id="text"
            label="Text"
            type="text"
            fullWidth
            variant="outlined"
            value={text}
            onChange={handleTextChange}
          />
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={() => {
            handleFarmerDashboard();
            console.log(image, text);
            handleClose();
          }}>Upload</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}


export default FarmerDashboard