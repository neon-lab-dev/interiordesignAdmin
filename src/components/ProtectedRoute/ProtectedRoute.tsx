import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    // console.log(isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
