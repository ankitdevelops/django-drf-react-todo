import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const { signup, authToken } = useContext(AuthContext);
	const navigate = useNavigate("/");
	const userData = {
		username: username,
		email: email,
		password: password,
		password2: password2,
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (username !== "" && password !== "" && password2 !== "") {
			if (password === password2) {
				signup(userData);
				navigate("/");
			}
		}
	};
	if (authToken) {
		return <Navigate to="/" />;
	}
	return (
		<div className="container">
			<div className="row mx-auto my-5">
				<div className="col-md-6 mx-auto">
					<div className="card p-3">
						<form onSubmit={onSubmit}>
							<div className="mb-3">
								<label className="form-label">Email</label>
								<input
									type="email"
									className="form-control"
									placeholder="your_email@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Username</label>
								<input
									type="text"
									className="form-control"
									placeholder="Username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Password</label>
								<input
									type="password"
									className="form-control"
									placeholder="Your secure Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<label className="form-label">Confirm Password</label>
								<input
									type="password"
									className="form-control"
									placeholder="Your secure Password"
									value={password2}
									onChange={(e) => setPassword2(e.target.value)}
								/>
							</div>
							<div className="d-grid gap-2">
								<button className="btn btn-dark" type="submit">
									Register
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
