import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Landing from "../assets/images/Landing-bg.jpg";
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
  const fullText = `
  mes by accident, sometimes on purpose (injected humour and the like).
  
  
  Where does it come from?
  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
  
  The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
  
  Where can I get some?
  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
  
  5
    paragraphs
    words
    bytes
    lists
    Start with 'Lorem
  ipsum dolor sit amet...'
  
  Translations: Can you help translate this site into a foreign language ? Please email us with details if you can help.
  There is a set of mock banners available here in three colours and in a range of standard banner sizes:
  BannersBannersBanners
  Donate: If you use this site regularly and would like to help keep the site on the Internet, please consider donating a small sum to help pay for the hosting and bandwidth bill. There is no minimum donation, any sum is appreciated - click here to donate using PayPal. Thank you for your support.
  Donate Bitcoin: 16UQLq1HZ3CNwhvgrarV6pMoA2CDjb4tyF
  NodeJS Python Interface GTK Lipsum Rails .NET Groovy
  The standard Lorem Ipsum passage, used since the 1500s
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  
  Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  
  1914 translation by H. Rackham
  "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
  
  Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
  
  1914 translation by H. Rackham
  "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
  
  help@lipsum.com
  Privacy Policy · 
  
  
  Freestar.`; // Your full text
  const trimmedText = `${fullText.substring(0, 1000)}...`; // Trim text to 100 characters for preview

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {

    getAllFarmers();
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

  const getAllFarmers = async () => {
    try {
      const response = await fetch(`http://localhost:6001/api/farmer/all-farmers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setFarmersList(json)
    } catch (error) {
      console.error("Error fetching data:", error);
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
                  objectFit: 'cover',
                  borderRadius: '10px',
                  border: '2px solid #ccc',

                }} />
              </div>
              <div className="carousel-item" style={{ height: '100%' }}>
                <img className="d-block w-100" src={Landing} alt="Second slide" style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  border: '2px solid #ccc',

                }} />
              </div>
              <div className="carousel-item" style={{ height: '100%' }}>
                <img className="d-block w-100" src={Landing} alt="Third slide" style={{
                  height: '100%',
                  width: 'auto',
                  objectFit: 'cover',
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
                  {fullText}
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
                <ListItem key={index}>
                  <ListItemIcon>
                    <IconButton
                      edge="start"
                      color="primary"

                      style={{ color: '#654321' }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText primary={unAssignedFarmer.username} />
                </ListItem>
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