import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const { logout} = useContext(AuthContext);
  const [check, setcheck] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    logout();
    navigate("/login");

  }, []);

    return(<>Log Out</>)
}
