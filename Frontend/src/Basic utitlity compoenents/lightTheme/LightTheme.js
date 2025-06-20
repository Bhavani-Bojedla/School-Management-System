// import { createTheme } from '@mui/material/styles';

// let LightTheme = createTheme({
//   palette: {
//     mode:'light',
//     primary: {
//       main: '#197602',
//     },
//     secondary: {
//       main: '#ff4081',
//     },
//     background:{
//         default:'#FSFSFS',
//         paper:'#ffffff'
//     },
//     text:{
//         primary:'#333333',
//         secondary:'#666666'
//     }
//   },
//   components:{
//     MuiTypography:{
//         fontFamily:'Roboto, Arial,sans-serif',
//         h1:{
//             fontSize:'2rem',
//             fontWeight:700
//         },
//         body1:{
//             fontSize:'1rem',
//             color:'#333'
//         }
//     },
//     MuiOutlinedInput:{
//         styleOverrides:{
//             root:{
//                 color:'#333333','&.MuiOutlinedInput-notchedOutline':{
//                     borderColor:'#CCCCCC'
//                 },
//                 '&:hover.MuiOutlinedInput-notchedOutline':{
//                     borderColor:'#197602'
//                 },
//                 '&.Mui-focused .MuiOutlinedInput-notchedOutline':{
//                     borderColor:'#197602'
//                 }
//             }
//         }
//     },
//     MuiInputLabel:{
//         styleOverrides:{
//             root:{
//                 color:'#666666',
//                 '&.Mui-focused':{
//                     color:'#197602'
//                 }
//             }
//         }
//     }
//   }
// });

// export default LightTheme;


import { createTheme } from '@mui/material/styles';

let LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00aaff', // Sky blue
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f5f5f5',  // Fixed typo from '#FSFSFS'
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      color: '#333333',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: '#333333',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cccccc',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00aaff',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00aaff',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#666666',
          '&.Mui-focused': {
            color: '#00aaff',
          },
        },
      },
    },
  },
});

export default LightTheme;
