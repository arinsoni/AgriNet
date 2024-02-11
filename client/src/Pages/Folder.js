import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Landing from "../assets/images/Landing-bg.jpg";
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick"; // Import the Slider component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const Folder = () => {
  const { id } = useParams();
  const [folderData, setFolderData] = useState(null);

  useEffect(() => {
    // Fetch folder data using the folderId
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
        console.log(json)
        setFolderData(json);
      } catch (error) {
        console.error('Error fetching folder data:', error);
      }
    };

    fetchFolderData();
  }, [id]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red", fontSize: '20px', width: '30px', height: '30px' }}
        onClick={onClick}
      >
        Next
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green", fontSize: '20px', width: '30px', height: '30px' }}
        onClick={onClick}
      >
        Prev
      </div>
    );
  }
  const imageStyles = {

    maxHeight: '100%', // Makes image max height 100% of its parent
    display: 'block', // Removes extra space beneath the image,
    objectFit: 'contain'
  };


  return (
    <>

      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '1700px'
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          backgroundColor: 'lightblue',
        }}>
          <Box sx={{
            width: '100%',
            height: '60%',
            backgroundColor: 'green',
            display: 'flex',
            flexDirection: 'row'
          }}>
            <Box sx={{
              width:'100%',
              backgroundColor: 'pink'
            }} >
              <img src={Landing} alt="Slide 1" style={imageStyles} />
            </Box>

            <Box sx={{
              width:'100%',
              backgroundColor: 'yellow'
            }} >
               {/* <img src={Landing} alt="Slide 1" style={imageStyles} /> */}
            </Box >

            <Box sx={{
              width:'100%',
              backgroundColor: 'orange'
            }} >
               {/* <img src={Landing} alt="Slide 1" style={imageStyles} /> */}
            </Box>

            <Box sx={{
              width:'100%',
              backgroundColor: 'grey'
            }} >
               {/* <img src={Landing} alt="Slide 1" style={imageStyles} /> */}
            </Box>

            {/* Carousel with images goes here */}
            {/* <Slider {...settings} sx={{
            backgroundColor: 'pink',
            height: '100%'
          }}>

            <img src={Landing} alt="Slide 1" style={imageStyles} />

            
            <img src={Landing} alt="Slide 1" style={imageStyles} />

         
            <img src={Landing} alt="Slide 1" style={imageStyles} />


            {/* ... other slides */}

          </Box>
          <Box sx={{
            width: '100%',
            height: '40%',
            backgroundColor: 'red',
          }}>
            {/* Your existing content */}
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '30%',
          backgroundColor: 'pink',
        }}>
          <Box sx={{
            width: '100%',
            height: '60%',
            backgroundColor: 'yellow',
          }}>
            Images
          </Box>
          <Box sx={{
            width: '100%',
            height: '40%',
            backgroundColor: 'orange',
          }}>
            Data
          </Box>
        </Box>
      </Box>


    </>
  );
}

export default Folder