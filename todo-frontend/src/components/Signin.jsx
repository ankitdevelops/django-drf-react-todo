import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
const Signin = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login, authToken } = useContext(AuthContext);
	const navigate = useNavigate();
	const onSubmit = (e) => {
		e.preventDefault();
		if (username !== "" && password !== "") {
			login(username, password);
			navigate("/");
		}
	};
	if (authToken) {
		return <Navigate to="/" />;
	}
	return (
		<section>
			<div className="container">
				<div className="row mx-auto my-5">
					<div className="col-md-6 mx-auto">
						<div className="card p-3">
							<form onSubmit={onSubmit}>
								<div className="mb-3">
									<label className="form-label">Username</label>
									<input
										type="text"
										className="form-control"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										placeholder="Username"
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Password</label>
									<input
										type="password"
										className="form-control"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Your secure Password"
									/>
								</div>
								<div className="d-grid gap-2">
									<button className="btn btn-dark" type="submit">
										Login
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signin;
