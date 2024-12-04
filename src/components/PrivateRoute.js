import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
    const userRole = localStorage.getItem("userRole");

    if (userRole !== requiredRole) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
