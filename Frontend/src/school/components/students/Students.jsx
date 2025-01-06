import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Form, useFormik } from "formik";
import { Button, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { studentEditSchema, studentSchema } from "../../../yupSchema/studentSchema";
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

export default function Student() {
  const [edit, setedit] = useState(false);
  const [Editid, setEditId] = useState(false);
  const [classes, setClasses] = React.useState([]);
  const [params, setParams] = useState({});
  const [Students, setStudents] = useState([]);
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
    student_class: "",
    age: "",
    gender: "",
    guardian: "",
    guardian_phone: "",
    password: "",
    confirm_password: "",
  };

  const handleEdit = (id) => {
    setedit(true);
    setEditId(id);
    const filteredStudent = Students.filter((x) => x._id === id);
    formik.setFieldValue("name", filteredStudent[0].name);
    formik.setFieldValue("email", filteredStudent[0].email);
    formik.setFieldValue("age", filteredStudent[0].age);
    formik.setFieldValue(
      "student_class",
      filteredStudent[0].student_class?._id || ""
    );
    formik.setFieldValue("gender", filteredStudent[0].gender);
    formik.setFieldValue("guardian", filteredStudent[0].guardian);
    formik.setFieldValue("guardian_phone", filteredStudent[0].guardian_phone);
  };

  const cancelEdit = (id) => {
    setedit(false);
    setEditId(null)
    formik.resetForm();
  };
  const formik = useFormik({
    initialValues,
    
    validationSchema: edit?studentEditSchema:studentSchema,
    onSubmit: (values) => {
      if (edit) {
        const fd = new FormData();
        
        fd.append("name", values.name);
        fd.append("email", values.email);
        fd.append("age", values.age);
        fd.append("gender", values.gender);
        fd.append("student_class", values.student_class);
        fd.append("guardian", values.guardian);
        fd.append("guardian_phone", values.guardian_phone);
        if(values.password){
          fd.append("password", values.password);
        }

        if (file) {
          fd.append("image", file, file.name);
          // fd.append("student_img", file, file.name);
        }

        axios
          .patch(`${baseApi}/student/update/${Editid}`, fd)
          .then((res) => {
            setMessageType("success");
            setMessage(res.data.message);
            formik.resetForm();
            handleClearfile();
          })
          .catch((e) => {
            console.log(e);
            setMessageType("error");
            setMessage("Error in Updating new student.");
          });
      } else {
        if (file) {
          const fd = new FormData();
          fd.append("student_img", file, file.name);
          fd.append("name", values.name);
          fd.append("email", values.email);
          fd.append("age", values.age);
          fd.append("gender", values.gender);
          fd.append("student_class", values.student_class);
          fd.append("guardian", values.guardian);
          fd.append("guardian_phone", values.guardian_phone);
          fd.append("password", values.password);

          axios
            .post(`${baseApi}/student/register`, fd)
            .then((res) => {
              setMessageType("success");
              setMessage(res.data.message);
              formik.resetForm();
              handleClearfile();
            })
            .catch((e) => {
              console.log(e);
              setMessageType("error");
              setMessage("Error in creating new student.");
            });
        } else {
          setMessageType("error");
          setMessage("Please Add School Image");
        }
      }
    },
  });

  const addImage = (event) => {
    const file = event.target.files[0];
    setimageurl(URL.createObjectURL(file));
    setfile(file);
  };

  const handleClass = (e) => {
    setParams((prevparams) => ({
      ...prevparams,
      student_class: e.target.value || undefined,
    }));
  };
  const handleSearch = (e) => {
    setParams((prevparams) => ({
      ...prevparams,
      search: e.target.value || undefined,
    }));
  };
  React.useEffect(() => {
    axios
      .get(`${baseApi}/student/all`, { params })
      .then((res) => {
        setStudents(res.data.students);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [message, params]);

  React.useEffect(() => {
    axios
      .get(`${baseApi}/class/all`)
      .then((res) => {
        setClasses(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [message]);

  const handleDelete = (id) => {
    if(confirm("Are you sure You want to delete?")){
      axios
      .delete(`${baseApi}/student/delete/${id}`)
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
          Edit the Student details
        </Typography>
      ) : (
        <Typography
          variant="h4"
          sx={{ textAlign: "center", fontWeight: "700" }}
        >
          Register Student
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
        <Typography>Add the Student Picture</Typography>
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
          label="Student Name"
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
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Student Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.student_class}
              label="student_class"
              name="student_class"
              onChange={formik.handleChange}
            >
              {classes &&
                classes.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.class_text} ({item.class_num})
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Box>

        {formik.touched.student_class && formik.errors.student_class && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.student_class}
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
          name="guardian"
          label="Guardian"
          value={formik.values.guardian}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.guardian && formik.errors.guardian && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.guardian}
          </p>
        )}

        <TextField
          name="guardian_phone"
          label="Guardian Phone"
          value={formik.values.guardian_phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.guardian_phone && formik.errors.guardian_phone && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {formik.errors.guardian_phone}
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
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
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

        <FormControl sx={{ width: "180px", marginLeft: "5px" }}>
          <InputLabel id="demo-simple-select-label">Student Class</InputLabel>
          <Select
            label="student_class"
            value={params.student_class ? params.student_class : ""}
            onChange={(e) => {
              handleClass(e);
            }}
          >
            <MenuItem value="">Select Class</MenuItem>
            {classes &&
              classes.map((item) => {
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.class_text} ({item.class_num})
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
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
        {Students &&
          Students.map((student) => {
            return (
              <Card key={student._id} sx={{ maxWidth: 370 ,marginRight:'10px'}}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="340"
                    image={`/images/uploaded/student/${student.student_img}`}
                    alt="green iguana"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Name: </strong> {student.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Email: </strong> {student.email}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Class: </strong>{" "}
                      {student.student_class?.class_text} (
                      {student.student_class?.class_num})
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Age: </strong> {student.age}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Gender: </strong> {student.gender}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Guardian: </strong> {student.guardian}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      <strong>Guardian Phone: </strong> {student.guardian_phone}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    ></Typography>
                  </CardContent>
                  <Button onClick={() => handleEdit(student._id)}>
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => handleDelete(student._id)}
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
