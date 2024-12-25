import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Utility components/Navbar/Navbar";
import Footer from "./Utility components/Footer/Footer";
import { Box } from "@mui/material";

export default function Client() {
  return (
    <div>
      <Navbar />
      <Box sx={{minHeight:'90vh'}} component={'div'}>
        <Outlet />
      </Box>

      <Footer />
    </div>
  );
}
