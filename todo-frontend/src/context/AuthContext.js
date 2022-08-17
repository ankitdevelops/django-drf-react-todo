import { createContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import authReducer from "./AuthReducer";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();
	const [authToken, setAuthToken] = useState(() =>
		localStorage.getItem("authToken")
			? JSON.parse(localStorage.getItem("authToken"))
			: null
	);

	// const [loading, setLoading] = useState(true);

	// const [state, dispatch] = useReducer(authReducer, initialData);

	const login = async (username, password) => {
		const user = {
			username: username,
			password: password,
		};

		const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		const data = await response.json();

		if (response.status === 200) {
			setAuthToken(data.token);
			localStorage.setItem("authToken", JSON.stringify(data.token));

			navigate("/");
		} else {
			alert("something went wrong");
		}

		// dispatch({
		// 	type: "LOGIN",
		// 	payload: data,
		// });
	};

	const signup = async (userData) => {
		const response = await fetch("http://127.0.0.1:8000/api/user/signup/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		}).catch((err) => {
			console.log(err);
		});

		const data = await response.json();

		if (data.token) {
			localStorage.clear("authToken");
			localStorage.setItem("authToken", data.token);
		} else {
			alert("Something went wrong");
		}

		// dispatch({
		// 	type: "SIGNUP",
		// 	payload: data,
		// });
	};

	const logout = () => {
		setAuthToken(null);
		localStorage.removeItem("authToken");
		navigate("/");
	};
	let contextData = {
		authToken: authToken,
		login: login,
		logout: logout,
		signup: signup,
	};
	return (
		<AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
