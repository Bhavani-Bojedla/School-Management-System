import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { subjectSchema } from "../../../yupSchema/subjectSchema";
import axios from "axios";
import { baseApi } from "../../../Environment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";

export default function Subjects() {
  const [editId,setEditId]=useState();
  const [subjects, setSubjects] = useState([]);
  const [edit, setedit] = useState(false);
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  const handleDelete = (id) => {
    axios
      .delete(`${baseApi}/subject/delete/${id}`)
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

  const handleEdit = (id, subject_name, subject_codename) => {
    setedit(true);
    setEditId(id);
    formik.setFieldValue("subject_name", subject_name);
    formik.setFieldValue("subject_codename", subject_codename);
  };

  const cancelEdit = () => {
    setedit(false);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues: { subject_name: "", subject_codename: "" },
    validationSchema: subjectSchema,
    onSubmit: (values) => {
      if (edit) {
        axios
          .patch(`${baseApi}/subject/update/${editId}`,{...values})
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
          .post(`${baseApi}/subject/create`, { ...values })
          .then((res) => {
            console.log("subject add response", res);
            setMessage(res.data.message);
            setMessageType("success");
          })
          .catch((error) => {
            console.log("error in subject", error);
            setMessage("Error in Saving");
            setMessageType("Error");
          });
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    axios
      .get(`${baseApi}/subject/all`)
      .then((res) => {
        setSubjects(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [message]);
  return (
    <div>
      <Typography variant="h3" sx={{textAlign:'center',fontWeight:'700'}}>Subjects</Typography>
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
          width: "100%",
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
            Edit the Subjects
          </Typography>
        ) : (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "700" }}
          >
            Add New Subjects
          </Typography>
        )}

        <TextField
          name="subject_name"
          label="Subject Name"
          value={formik.values.subject_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.subject_name && formik.errors.subject_name && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.subject_name}
          </p>
        )}

        <TextField
          name="subject_codename"
          label="Subject Codename"
          value={formik.values.subject_codename}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.subject_codename && formik.errors.subject_codename && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.subject_codename}
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
        {subjects &&
          subjects.map((item) => {
            return (
              <Paper key={item._id} sx={{ m: 2, p: 2 }}>
                <Box component={"div"}>
                  <Typography variant="h5" sx={{}}>
                    <strong>Subject: </strong> {item.subject_name} [{item.subject_codename}
                    ]
                  </Typography>
                </Box>
                <Box component={"div"}>
                  <Button
                    onClick={() => {
                      handleEdit(item._id, item.subject_name, item.subject_codename);
                    }}
                  >
                    <EditIcon />
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
