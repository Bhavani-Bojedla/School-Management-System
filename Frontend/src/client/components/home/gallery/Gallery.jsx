import React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Box, Modal, Typography } from "@mui/material";
import axios from "axios";

export default function Gallery() {
  const [open, setOpen] = React.useState(false);
  const [selectedSchool, setSelectedSchool] = React.useState(null);
  const [schools, setSchools] = React.useState([]);

  const handleOpen = (school) => {
    setOpen(true);
    setSelectedSchool(school);
  };
 
  const handleClose = () => {
    setOpen(false);
    setSelectedSchool(null);
  };

  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/school/all`)
      .then((res) => {
        setSchools(res.data.schools);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        School Gallery
      </Typography>
      <ImageList
        sx={{
          width: "100%",
          height: "100%",
        //   gap:60
        }}
        cols={3}
      >
        {schools.map((school) => (
          <ImageListItem
            key={school.school_img}
            sx={{
                p:2,
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" },
            }}
            onClick={() => handleOpen(school)}
          >
            <img
              src={`./images/uploaded/school/${school.school_img}`}
              alt={school.school_name}
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "5px",
                objectFit: "cover",
              }}
            />
            <ImageListItemBar
              title={school.school_name}
              subtitle={<span>by: <strong>{school.owner_name}</strong></span>}
              position="below"
              sx={{ textAlign: "center", color: "#333" }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {selectedSchool && (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 2,
        maxWidth: "90%",
        maxHeight: "90%",
        overflow: "auto",
        outline: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p:2,
        justifyContent: "center",
      }}
    >
      <img
        src={`./images/uploaded/school/${selectedSchool.school_img}`}
        alt={selectedSchool.school_name}
        style={{
          width: "100%",
          maxHeight: "500px",
          borderRadius: "8px",
          objectFit: "contain",
        }}
      />
      <Typography variant="h6" align="center" sx={{ fontWeight: 600,  }}>
        {selectedSchool.school_name}
      </Typography>
      <Typography align="center" sx={{ color: "text.secondary"}}>
        {selectedSchool.owner_name}
      </Typography>
    </Box>
  </Modal>
)}

    </Box>
  );
}
