import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";

const ProtectedRoute = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return (
    console.log(props.element, "props.element ++++++++++++++"),
    localStorage.getItem("token") && isAuthenticated ? props.element : <Navigate to="/login" />
  );
};

export default ProtectedRoute;
