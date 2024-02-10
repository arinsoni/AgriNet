import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import FarmerLogin from "./Farmer/Login";
import AdminLogin from "./Admin/Login";

const Homepage = () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); 
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const maxWidth = isMobile ? '90vw' : '600px'; 

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#f0f0f0', 
      }} >
      <Paper sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '80%',
        maxWidth: maxWidth, // Set maximum width dynamically
        backgroundColor: 'lightblue',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Add shadow for depth
        borderRadius: '10px', // Add border radius for rounded corners
        padding: '10px'
      }} >
        <Box sx={{
          width: '100%', // Set width to 100% in mobile mode
          display: 'flex',
          paddingRight: !isMobile ? '10px' : '',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            Log in as Admin
            <AdminLogin />
          </Box>

        </Box>
        <Box sx={{
          width: '100%', // Set width to 100% in mobile mode
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            Log in as Farmer
            <FarmerLogin />
          </Box>

        </Box>
      </Paper>
    </Box>
  );
}

export default Homepage;
