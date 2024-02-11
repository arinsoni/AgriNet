import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Landing from "../assets/images/Landing-bg.jpg";
import FarmerL1 from "../assets/images/farmer-login.jpg"
import FarmerL2 from "../assets/images/Farmer-login2.jpg"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import adminContext from '../context/admin/adminContext';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import RemoveIcon from '@mui/icons-material/Remove';

const Folder = () => {
  const { id } = useParams();
  const folderId = id;
  const [folderData, setFolderData] = useState(null);

  const initialFarmersList = []
  const [farmersList, setFarmersList] = useState(initialFarmersList)

  const initialAssignedFarmersList = []
  const [assignedFarmersList, setAssignedFarmersList] = useState(initialAssignedFarmersList)

  const initialUnAssignedFarmersList = []
  const [unAssignedFarmersList, setUnAssignedFarmersList] = useState(initialUnAssignedFarmersList)

  const adminContextValue = useContext(adminContext);
  const adminId = adminContextValue.adminId;


  const [open, setOpen] = useState(false);
 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [farmerImages, setFarmerImages] = useState([]);
  useEffect(() => {
    const fetchFarmerImages = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
          'auth-token': token
        };

        const response = await fetch(`http://localhost:6001/api/admin/folder/${folderId}/images`, {
          headers: headers // Pass the headers object to the fetch request
        });

        if (!response.ok) {
          throw new Error('Failed to fetch farmer images');
        }

        const data = await response.json();
        console.log(`images: ${data}`);
        setFarmerImages(data);
      } catch (error) {
        console.error('Error fetching farmer images:', error);
      }
    };
    fetchFarmerImages();
  }, [folderId]);


  useEffect(() => {

    // getAllFarmers();
    getAssignedFarmers();
    getUnAssignedFarmers();
    const fetchFolderData = async () => {
      try {
        const response = await fetch(`http://localhost:6001/api/folders/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        // console.log(json)
        setFolderData(json);
      } catch (error) {
        console.error('Error fetching folder data:', error);
      }
    };

    fetchFolderData();
  }, [id]);



  const assignFolder = async (farmerId) => {
    const assignedFarmer = unAssignedFarmersList.find(farmer => farmer._id === farmerId);
    if (!assignedFarmer) return;


    setUnAssignedFarmersList(prev => prev.filter(farmer => farmer._id !== farmerId));
    setAssignedFarmersList(prev => [...prev, assignedFarmer]);

    try {
      const response = await fetch(`http://localhost:6001/api/admin/folder-assignments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          farmer_id: farmerId,
          folder_id: folderId,
          assigned_by: adminId
        })
      });
      const json = await response.json();
    } catch (error) {
      console.error("Error assigning folder:", error);
      setAssignedFarmersList(prev => prev.filter(farmer => farmer._id !== farmerId));
      setUnAssignedFarmersList(prev => [...prev, assignedFarmer]);
    }
  };

  const getAssignedFarmers = async () => {

    try {
      const url = `http://localhost:6001/api/admin/get-assigned-farmers?folderId=${folderId}&adminId=${adminId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setAssignedFarmersList(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getUnAssignedFarmers = async () => {

    try {
      const url = `http://localhost:6001/api/admin/get-unassigned-farmers?folderId=${folderId}&adminId=${adminId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setUnAssignedFarmersList(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const [text, setText] = useState('No data uploaded')
  const [trimmedText, setTrimmedText] = useState('')
  const getText = async (farmerId) => {

    try {
      const url = `http://localhost:6001/api/admin/get-text?folderId=${folderId}&adminId=${adminId}&farmerId=${farmerId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setTrimmedText(text[0].text)
      setText(json);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  


  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100%',
      }} >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          padding: '20px',
          flex: '70%'
        }}>
          <div>
            {/* Map through the fetched images and display them */}

          </div>
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={{
            width: '100%',
            height: '60%',
            paddingBottom: '10px',




          }}>
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner" style={{
              height: '100%', borderRadius: '10px',
              border: '2px solid #ccc',
            }}>
              <div className="carousel-item active" style={{
                height: '100%', borderRadius: '10px',
                border: '2px solid #ccc',
              }}>
                <img className="d-block w-100" src={Landing} alt="First slide" style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  border: '2px solid #ccc',

                }} />
              </div>
              <div className="carousel-item" style={{ height: '100%' }}>
                <img className="d-block w-100" src={FarmerL1} alt="Second slide" style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  border: '2px solid #ccc',

                }} />
              </div>
              <div className="carousel-item" style={{ height: '100%' }}>
                <img className="d-block w-100" src={FarmerL2} alt="Third slide" style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  border: '2px solid #ccc',

                }} />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>


          <Box sx={{
            width: '100%',
            height: '60%',
            backgroundColor: '#C4A484',
            padding: '20px',
            marginTop: '10px',

            border: '2px solid #D6C1B3',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'auto',
            '&:hover': {
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
          }}>
       {trimmedText}

            <Button onClick={handleOpen}>View More</Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Full Text</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {text}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </Box>

        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          padding: '20px',
          flex: "30%"
        }}>


          <Box sx={{
            width: '100%',
            height: 'auto',
            backgroundColor: '#C4A484',
            padding: '20px',
            marginTop: '10px',
            border: '2px solid #D6C1B3',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'auto',
            '&:hover': {
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
          }}>
            {unAssignedFarmersList.length === 0 ?
              (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {folderData && <h4>No Farmers left to assign to {folderData.name}</h4>}
                </Typography>
              ) : (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {folderData && <h4>Assign Farmer to {folderData.name}</h4>}
                </Typography>
              )

            }



            <List>
              {unAssignedFarmersList.map((unAssignedFarmer, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <IconButton
                      edge="start"
                      color="primary"
                      onClick={() => assignFolder(unAssignedFarmer._id)}
                      style={{ color: '#654321' }}
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary={unAssignedFarmer.username} />
                </ListItem>
              ))}
            </List>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Click on plus icon to asign farmer to this folder
            </Typography>

          </Box>

          <Box sx={{
            width: '100%',
            height: 'auto',
            backgroundColor: '#C4A484',
            padding: '20px',
            marginTop: '10px',
            border: '2px solid #D6C1B3',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'auto',
            '&:hover': {
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
          }}>
            {unAssignedFarmersList.length === 0 ?
              (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {folderData && <h4>No assigned farmers in  {folderData.name}, can do it from above </h4>}
                </Typography>
              ) : (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {folderData && <h4>Assigned Farmers in {folderData.name}</h4>}
                </Typography>
              )

            }
            <List>
              {assignedFarmersList.map((unAssignedFarmer, index) => (
                <div key={index} onClick={() => getText(unAssignedFarmer._id)}>
                  <ListItem>
                    <ListItemIcon>
                      <IconButton edge="start" color="primary" style={{ color: '#654321' }}>
                        <RemoveIcon />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemText primary={unAssignedFarmer.username} />
                  </ListItem>
                </div>
              ))}
            </List>

            <Typography variant="body1" sx={{ mt: 2 }}>
              Click on - icon to asign farmer to this folder
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Folder