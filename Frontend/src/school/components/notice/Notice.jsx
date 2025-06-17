import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { noticeSchema } from "../../../yupSchema/noticeSchema";
import axios from "axios";
import { baseApi } from "../../../Environment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

export default function Notice() {
  const [editId, setEditId] = useState();
  const [notices, setNotices] = useState([]);
  const [edit, setedit] = useState(false);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");

  const [tabValue, setTabValue] = useState("all");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const filteredNotices =
    tabValue === "all"
      ? notices
      : notices.filter((notice) => notice.audience === tabValue);

  const handleMessageClose = () => {
    setMessage("");
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseApi}/notice/delete/${id}`)
      .then((res) => {
        console.log(res);
        setMessage(res.data.message);
        setMessageType("success");
        setedit(false);
      })
      .catch((e) => {
        console.log(e);
        setMessage("error in deleting");
        setMessageType("error");
      });
  };

  const handleEdit = (id, title, message, audience) => {
    setedit(true);
    setEditId(id);
    formik.setFieldValue("title", title);
    formik.setFieldValue("message", message);
    formik.setFieldValue("audience", audience);
  };

  const cancelEdit = () => {
    setedit(false);
    setEditId(null);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues: { title: "", message: "", audience: "" },
    validationSchema: noticeSchema,
    onSubmit: (values) => {
      if (edit) {
        axios
          .patch(`${baseApi}/notice/update/${editId}`, { ...values })
          .then((res) => {
            console.log(res);
            setMessage(res.data.message);
            setMessageType("success");
            cancelEdit();
          })
          .catch((e) => {
            console.log(e);
            setMessage("error in updating");
            setMessageType("error");
          });
      } else {
        axios
          .post(`${baseApi}/notice/create`, { ...values })
          .then((res) => {
            console.log("notice add response", res);
            setMessage(res.data.message);
            setMessageType("success");
          })
          .catch((error) => {
            console.log("error in notice", error);
            setMessage("Error in Saving");
            setMessageType("Error");
          });
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    axios
      .get(`${baseApi}/notice/all`)
      .then((res) => {
        setNotices(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [message]);
  return (
    <div>
      {/* {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )} */}
      <h1>Notice</h1>
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}

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
        onSubmit={formik.handleSubmit}
      >
        {edit ? (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Edit the Notice
          </Typography>
        ) : (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Add New Notice
          </Typography>
        )}

        <TextField
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.title}
          </p>
        )}

        <TextField
          multiline
          rows={4}
          name="message"
          label="Message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.message && formik.errors.message && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.message}
          </p>
        )}
        <FormControl sx={{ marginTop: "10px" }} fullWidth>
          <InputLabel id="demo-simple-select-label">Audience</InputLabel>
          <Select
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="audience"
            label="Audience"
            value={formik.values.audience}
          >
            <MenuItem value={""}>Select audience</MenuItem>
            <MenuItem value={"teacher"}>Teacher</MenuItem>
            <MenuItem value={"student"}>Student</MenuItem>
          </Select>
        </FormControl>
        {formik.touched.audience && formik.errors.audience && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.audience}
          </p>
        )}
        <Button sx={{ width: "120px" }} variant="contained" type="submit">
          Submit
        </Button>

        {edit && (
          <Button
            sx={{ width: "120px" }}
            onClick={() => {
              cancelEdit();
            }}
            variant="outlined"
            type="submit"
          >
            Cancel
          </Button>
        )}
      </Box>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{ mt: 4 }}
      >
        <Tab value="all" label="All Notices" />
        <Tab value="student" label="Student Notices" />
        <Tab value="teacher" label="Teacher Notices" />
      </Tabs>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", mt: 4, fontWeight: "bold", color: "#333" }}
      >
        {tabValue === "student"
          ? "Notices for students"
          : tabValue === "teacher"
          ? "Notices for teachers"
          : "All Notices"}
      </Typography>

      {filteredNotices &&
        filteredNotices.map((item) => {
          return (
            <Paper
              key={item._id}
              sx={{
                paddingBottom: 2,
                paddingLeft: 3,
                paddingTop: 0.2,
                marginTop:3,
                width: "100%",
                maxWidth: "400px", // You can change this to 300px or 350px if you want narrower cards
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Typography variant="h5">
                  <strong>Notice: </strong> {item.title}
                </Typography>
                <Typography variant="h5">
                  <strong>Message: </strong> {item.message}
                </Typography>
                <Typography variant="h5">
                  <strong>Audience: </strong> {item.audience}
                </Typography>
              </Box>
              <Box component={"div"}>
                <Button
                  onClick={() => {
                    handleEdit(
                      item._id,
                      item.title,
                      item.message,
                      item.audience
                    );
                  }}
                >
                  <EditIcon className="size-5" />
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                  sx={{ color: "red" }}
                >
                  <DeleteIcon />
                </Button>
              </Box>
            </Paper>
          );
        })}
    </div>
  );
}
