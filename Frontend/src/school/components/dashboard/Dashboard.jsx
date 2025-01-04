import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseApi } from "../../../Environment";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import { CardMedia } from "@mui/material";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

export default function Dashboard() {
  const [School, setSchool] = useState(null);
  const [SchoolName, setSchoolName] = useState(null);
  const [edit, setEdit] = useState(null);
  //message
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  useEffect(() => {
    axios
      .get(`${baseApi}/school/fetch-single`)
      .then((res) => {
        console.log(res);
        setSchool(res.data.School);
        setSchoolName(res.data.School.school_name);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [message]);

  //  resetting image
  const [file, setfile] = React.useState(null);
  const [imageurl, setimageurl] = React.useState(null);

  const addImage = (event) => {
    const file = event.target.files[0];
    setimageurl(URL.createObjectURL(file));
    setfile(file);
  };

  const fileInputRef = React.useRef(null);
  const handleClearfile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setfile(null);
    setimageurl(null);
  };

  const handleEditSubmit = () => {
    const fd = new FormData();
    fd.append("school_name", SchoolName);
    if (file) {
      fd.append("image", file, file.name);
    }

    axios
      .patch(`${baseApi}/school/update`, fd)
      .then((res) => {
        console.log(res);
        setMessageType("success");
        setMessage(res.data.message);
        cancelEdit();
      })
      .catch((e) => {
        console.log(e);
        setMessageType("error");
        setMessage(e.response.data.message);
      });
  };

  const cancelEdit = () => {
    setEdit(false);
    handleClearfile();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}
      {edit && (
        <>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
              display: "flex",
              flexDirection: "column",
              width: "50vw",
              minWidth: "230px",
              margin: "auto",
              background: "#fff",
            }}
            noValidate
            autoComplete="off"
          >
            <Typography>Add your School Picture</Typography>
            <TextField
              type="file"
              inputRef={fileInputRef}
              onChange={(event) => {
                {
                  addImage(event);
                }
              }}
            />
            {imageurl && (
              <Box>
                <CardMedia component={"img"} image={imageurl} />
              </Box>
            )}
            <TextField
              label="School Name"
              value={SchoolName}
              onChange={(e) => {
                setSchoolName(e.target.value);
              }}
            />

            <Button variant="contained" onClick={handleEditSubmit}>
              Submit Edit
            </Button>
            <Button variant="outlined" onClick={cancelEdit}>
              Cancel
            </Button>
          </Box>
        </>
      )}
      {School && (
        <Box
          sx={{
            height: "500px",
            width: "100%",
            background: `url('/images/uploaded/school/${School.school_img}')`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Typography variant="h3">{School.school_name}</Typography>
          <Box
            component={"div"}
            sx={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              height: "50px",
              width: "50px",
            }}
          >
            <Button
              sx={{
                background: "#fff",
                borderRadius: "50%",
                height: "100%",
                width: "100%",
              }}
              onClick={() => setEdit(true)}
            >
              {" "}
              <EditIcon />
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}
