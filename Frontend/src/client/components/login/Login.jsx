import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Form, useFormik } from "formik";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import Snackbar from "../../../Basic utitlity compoenents/SnackBar/MessageSnackbar";
import { loginSchema } from "../../../yupSchema/loginSchema";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate=useNavigate();
   const {login}=React.useContext(AuthContext)
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("success");
  const handleMessageClose = () => {
    setMessage("");
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Register submit values", values);

      axios
        .post(`http://localhost:5000/api/school/login`, { ...values })
        .then((res) => {
          const token = res.headers.get("Authorization");
          if (token) {
            localStorage.setItem("token", token);
          }
          const User = res.data.user;
          if (User) {
            login(User);
            
            localStorage.setItem("user", JSON.stringify(User));
          }
          setMessageType("success");
          setMessage(res.data.message);
          formik.resetForm();
          navigate('/school')
        })
        .catch((e) => {
          console.log(e);
          setMessageType("error");
          setMessage(e.response.data.message);
        });
    },
  });

  return (
    <Box
      component={"div"}
      sx={{
        background:
          "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        minHeight: "91vh",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      {message && (
        <Snackbar
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
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Login
        </Typography>
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

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
