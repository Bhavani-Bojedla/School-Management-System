// import { createTheme } from "@mui/material/styles";

// let DarkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#1e90$f",
//     },
//     secondary: {
//       main: "#ff4081",
//     },
//   },
//   components: {
//     MuiTypography: {
//       styleOverrides: {
//         root: {
//           color: "#ffffff",
//         },
//         h1: {
//           fontSize: "2rem",
//           fontWeight: 700,
//           color:'#ffffff'
//         },
//         body1: {
//           fontSize: "1rem",
//           color: "#ffffff",
//         },
//       },
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           color: "#ffffff",
//           "&.MuiOutlinedInput-notchedOutline": {
//             borderColor: "#666666",
//           },
//           "&:hover.MuiOutlinedInput-notchedOutline": {
//             borderColor: "#$$$$$$",
//           },
//           "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//             borderColor: "#1e90$$",
//           },
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           color: "#CCCCCC",
//           "&.Mui-focused": {
//             color: "#ffffff",
//           },
//         },
//       },
//     },
//   },
// });

// export default DarkTheme;

import { createTheme } from "@mui/material/styles";

let DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1e90ff", // Correct sky blue
    },
    secondary: {
      main: "#ff4081",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#ffffff",
    },
    body1: {
      fontSize: "1rem",
      color: "#ffffff",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "black",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#666666",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "black",
          "&.Mui-focused": {
            color: "black",
          },
        },
      },
    },
  },
});

export default DarkTheme;
