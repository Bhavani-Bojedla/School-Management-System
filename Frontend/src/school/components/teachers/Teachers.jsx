import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {  useFormik } from "formik";
import { Button, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { baseApi } from "../../../Environment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { teacherEditSchema, teacherSchema } from "../../../yupSchema/teacherSchema";

export default function Teachers() {
  const [edit, setedit] = useState(false);
  const [Editid, setEditId] = useState(false);
  const [params, setParams] = useState({});
  const [Teachers, setTeachers] = useState([]);
  const [file, setfile] = useState(null);
  const [imageurl, setimageurl] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };
  const fileInputRef = React.useRef(null);
  const handleClearfile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setfile(null);
    setimageurl(null);
  };
  const initialValues = {
    name: "",
    email: "",
    age: "",
    gender: "",
    qualification: "",
    password: "",
    confirm_password: "",
  };

  const handleEdit = (id) => {
    setedit(true);
    setEditId(id);
    const filteredTeacher = Teachers.filter((x) => x._id === id);
    formik.setFieldValue("name", filteredTeacher[0].name);
    formik.setFieldValue("email", filteredTeacher[0].email);
    formik.setFieldValue("age", filteredTeacher[0].age);
    formik.setFieldValue("gender", filteredTeacher[0].gender);
    formik.setFieldValue("qualification", filteredTeacher[0].qualification);
  };

  const cancelEdit = (id) => {
    setedit(false);
    setEditId(null);
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues,

    validationSchema: edit ? teacherEditSchema : teacherSchema,
    onSubmit: (values) => {
      if (edit) {
        const fd = new FormData();

        fd.append("name", values.name);
        fd.append("email", values.email);
        fd.append("age", values.age);
        fd.append("gender", values.gender);
        fd.append("qualification", values.qualification);
        if (values.password) {
          fd.append("password", values.password);
        }

        if (file) {
          fd.append("image", file, file.name);
          // fd.append("teacher_img", file, file.name);
        }

        axios
          .patch(`${baseApi}/teacher/update/${Editid}`, fd)
          .then((res) => {
            setMessageType("success");
            setMessage(res.data.message);
            formik.resetForm();
            handleClearfile();
          })
          .catch((e) => {
            console.log(e);
            setMessageType("error");
            setMessage("Error in Updating new teacher.");
          });
      } else {
        if (file) {
          const fd = new FormData();
          fd.append("teacher_img", file, file.name);
          fd.append("name", values.name);
          fd.append("email", values.email);
          fd.append("age", values.age);
          fd.append("gender", values.gender);
          fd.append("qualification", values.qualification);
          fd.append("password", values.password);
         
          axios
            .post(`${baseApi}/teacher/register`, fd)
            .then((res) => {
              setMessageType("success");
              setMessage(res.data.message);
              console.log(res)
              formik.resetForm();
              handleClearfile();
            })
            .catch((e) => {
              console.log(e);
              setMessageType("error");
              setMessage("Error in creating new teacher.");
            });
        } else {
          setMessageType("error");
          setMessage("Please Add teacher Image");
        }
      }
    },
  });

  const addImage = (event) => {
    const file = event.target.files[0];
    setimageurl(URL.createObjectURL(file));
    setfile(file);
  };
  const handleSearch = (e) => {
    setParams((prevparams) => ({
      ...prevparams,
      search: e.target.value || undefined,
    }));
  };
  React.useEffect(() => {
    axios
      .get(`${baseApi}/teacher/all`, { params })
      .then((res) => {
        setTeachers(res.data.teachers);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [message, params]);

  const handleDelete = (id) => {
    if (confirm("Are you sure You want to delete?")) {
      axios
        .delete(`${baseApi}/teacher/delete/${id}`)
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
    }
  };

  return (
    <Box
      component={"div"}
      sx={{
        // background:
        //   "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
        height: "100%",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          messageType={messageType}
          handleClose={handleMessageClose}
        />
      )}
      {edit ? (
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "700" }}
        >
          Edit the Teacher details
        </Typography>
      ) : (
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "700" }}
        >
          Register Teacher
        </Typography>
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
        <Typography>Add the Teacher Picture</Typography>
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
          name="name"
          label="Teacher Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.name}
          </p>
        )}

        <TextField
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.email}
          </p>
        )}

        <TextField
          name="age"
          label="Age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.age && formik.errors.age && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.age}
          </p>
        )}

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.gender}
              label="gender"
              name="gender"
              onChange={formik.handleChange}
            >
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {formik.touched.gender && formik.errors.gender && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.gender}
          </p>
        )}

        <TextField
          name="qualification"
          label="Qualification"
          value={formik.values.qualification}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.qualification && formik.errors.qualification && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.qualification}
          </p>
        )}

        <TextField
          type="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.password}
          </p>
        )}
        <TextField
          type="password"
          name="confirm_password"
          label="Confirm Password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirm_password && formik.errors.confirm_password && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.confirm_password}
          </p>
        )}

        <Button variant="contained" type="submit">
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

      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <TextField
          label="search"
          value={params.search ? params.search : ""}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </Box>

      <Box
        component={"div"}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        {Teachers &&
          Teachers.map((teacher) => {
            return (
              <Card
                key={teacher._id}
                sx={{ maxWidth: 370, marginRight: "10px" }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="340"
                    image={`/images/uploaded/teacher/${teacher.teacher_img}`}
                    alt="green iguana"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Name: </strong> {teacher.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Email: </strong> {teacher.email}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Age: </strong> {teacher.age}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Gender: </strong> {teacher.gender}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>qualification: </strong> {teacher.qualification}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    ></Typography>
                  </CardContent>
                  <Button onClick={() => handleEdit(teacher._id)}>
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => handleDelete(teacher._id)}
                    sx={{ marginLeft: "10px" }}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </Button>
                </CardActionArea>
              </Card>
            );
          })}
      </Box>
    </Box>
  );
}
