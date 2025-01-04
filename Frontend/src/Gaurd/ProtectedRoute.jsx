import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, authenticated } = useContext(AuthContext);
  const [check, setcheck] = useState(false);
  useEffect(() => {
    setcheck(true);
  }, []);

  if (check && !authenticated) {
    console.log("errr");
    return <Navigate to={"/login"} />;
  }
  if (check && allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={"/login"} />;
  }

  if (check) {
    return children;
  }
}
