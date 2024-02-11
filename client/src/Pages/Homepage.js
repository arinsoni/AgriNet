import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import FarmerLogin from "./Farmer/Login";
import AdminLogin from "./Admin/Login";
import FarmerRegister from "./Farmer/Register";
import AdminRegister from "./Admin/Register";
import AdminDash from "./AdminDashboard";

const Homepage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            Log in as Admin
            <AdminLogin />
            <Typography variant="body2" color="textSecondary" mt={2}>
              Not registered yet? Register{" "}
              <Link to="/admin-register" style={{ color: "red" }}>
                here
              </Link>
            </Typography>
          </Box>
        </Box>
        
        <Box
          sx={{
            width: "100%",
            display: "flex",
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
            Log in as Farmer
            <FarmerLogin />
            <Typography variant="body2" color="textSecondary" mt={2}>
              Not registered yet? Register{" "}
              <Link to="/farmer-register" style={{ color: "red" }}>
                here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Homepage;

// import { Paper, Typography } from "@mui/mat

// import React, { useState } from "react";
// import { Paper, Typography, Box } from "@mui/material";
// import { Link } from "react-router-dom";
// import FarmerLogin from "./Farmer/Login";
// import AdminLogin from "./Admin/Login";
// import AdminRegister from "./Admin/Register";

// const Homepage = () => {
//   const [showAdminRegister, setShowAdminRegister] = useState(false);

//   const handleAdminRegisterClick = () => {
//     setShowAdminRegister(true);
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#f0f0f0",
//       }}
//     >
//       <Paper
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           width: "80%",
//           maxWidth: "600px",
//           backgroundColor: "lightblue",
//           boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
//           borderRadius: "10px",
//           padding: "20px",
//         }}
//       >
//         {!showAdminRegister ? (
//           <>
//             <Typography variant="h5" align="center" mb={2}>
//               Welcome to AgriNet
//             </Typography>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexDirection: "column",
//                 gap: "10px",
//               }}
//             >
//               <Typography variant="body2" color="textSecondary">
//                 Log in as Admin
//               </Typography>
//               <AdminLogin />
//               <Typography variant="body2" color="textSecondary">
//                 Not registered yet? Register{" "}
//                 <Link
//                   to="#"
//                   onClick={handleAdminRegisterClick}
//                   style={{ color: "red" }}
//                 >
//                   here
//                 </Link>
//               </Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Log in as Farmer
//               </Typography>
//               <FarmerLogin />
//               <Typography variant="body2" color="textSecondary">
//                 Not registered yet? Register{" "}
//                 <Link to="/farmer-register" style={{ color: "red" }}>
//                   here
//                 </Link>
//               </Typography>
//             </Box>
//           </>
//         ) : (
//           <AdminRegister />
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default Homepage;
