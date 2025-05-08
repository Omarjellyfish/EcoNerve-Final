
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../../Context/Login/Login";

function PrivateRoute({ children }) {
    const { isAuthenticated } = useContext(LoginContext);

    return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export{PrivateRoute};