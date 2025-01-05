import {
  Box,
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { classSchema } from "../../../yupSchema/classSchema";
import axios from "axios";
import { baseApi } from "../../../Environment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

export default function Class() {
  const [editId,setEditId]=useState();
  const [classes, setClasses] = useState([]);
  const [edit, setedit] = useState(false);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseApi}/class/delete/${id}`)
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

  const handleEdit = (id, class_text, class_num) => {
    setedit(true);
    setEditId(id);
    formik.setFieldValue("class_text", class_text);
    formik.setFieldValue("class_num", class_num);
  };

  const cancelEdit = () => {
    setedit(false);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues: { class_text: "", class_num: "" },
    validationSchema: classSchema,
    onSubmit: (values) => {
      if (edit) {
        axios
          .patch(`${baseApi}/class/update/${editId}`,{...values})
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
          .post(`${baseApi}/class/create`, { ...values })
          .then((res) => {
            console.log("class add response", res);
            setMessage(res.data.message);
            setMessageType("success");
          })
          .catch((error) => {
            console.log("error in class", error);
            setMessage("Error in Saving");
            setMessageType("Error");
          });
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    axios
      .get(`${baseApi}/class/all`)
      .then((res) => {
        setClasses(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [message]);
  return (
    <div>
      <h1>Class</h1>
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
            Edit the Class
          </Typography>
        ) : (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Add New Class
          </Typography>
        )}

        <TextField
          name="class_text"
          label="Class Text"
          value={formik.values.class_text}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.class_text && formik.errors.class_text && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.class_text}
          </p>
        )}

        <TextField
          name="class_num"
          label="class Number"
          value={formik.values.class_num}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.class_num && formik.errors.class_num && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.class_num}
          </p>
        )}
        <Button sx={{width:'120px'}} variant="contained" type="submit">
          Submit
        </Button>

        {edit && (
          <Button
          sx={{width:'120px'}}
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

      <Box
        component={"div"}
        sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {classes &&
          classes.map((item) => {
            return (
              <Paper key={item._id} sx={{ m: 2, p: 2 }}>
                <Box component={"div"}>
                  <Typography variant="h5" sx={{}}>
                    <strong>Class: </strong> {item.class_text} [{item.class_num}
                    ]
                  </Typography>
                </Box>
                <Box component={"div"}>
                  <Button
                    onClick={() => {
                      handleEdit(item._id, item.class_text, item.class_num);
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
      </Box>
    </div>
  );
}
