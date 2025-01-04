import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const CarouselItems = [
  {
    image:
      "https://cdn.pixabay.com/photo/2020/12/10/20/40/color-5821297_1280.jpg",
    title: "Explore Our Classrooms",
    description: "Engaging and inspiring environments for every student",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2017/10/10/00/03/child-2835430_1280.jpg",
    title: "Empowering Students",
    description: "Engaging and inspiring environments for every student",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2019/09/03/01/51/child-4448370_1280.jpg",
    title: "Learning Tools",
    description: "Engaging and inspiring environments for every student",
  },
];

export default function Carousel() {
  const [activeIndex, setactiveIndex] = useState(0);

  const handleNext = () => {
    setactiveIndex((previndex) => (previndex + 1) % CarouselItems.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setactiveIndex((prevIndex) => (prevIndex + 1) % CarouselItems.length);
    }, 3000); // Change slide every 3 seconds

    // Clean up the interval when component unmounts or activeIndex changes
    return () => clearInterval(interval);
  }, [activeIndex]);
  const handleback = () => {
    setactiveIndex((previndex) =>
      previndex === 0 ? CarouselItems.length - 1 : previndex - 1
    );
  };
  return (
    <>
      <Box sx={{ position: "relative", width: "100%" }}>
        <SwipeableViews
          index={activeIndex}
          onChange={(index) => setactiveIndex(index)}
        >
          {CarouselItems.map((item, index) => (
            <Box
              key={index}
              sx={{ position: "relative", textAlign: "center", color: "white" }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "70vh",
                  minWidth: "400px",
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  bgcolor: "rgba(0,0,0,0.6)",
                  padding: "10px 20px",
                  borderRadius: 1,
                }}
              >
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Box>
            </Box>
          ))}
        </SwipeableViews>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            zIndex:1
          }}
        >
          <Button variant="contained" onClick={handleback}>
            <ArrowBackIosIcon/>
          </Button>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            zIndex:1
          }}
        >
          <Button variant="contained" onClick={handleNext}>
            <ArrowForwardIosIcon/>
          </Button>
        </Box>
      </Box>
    </>
  );
}
