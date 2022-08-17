import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = () => {
	let { authToken } = useContext(AuthContext);

	return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
