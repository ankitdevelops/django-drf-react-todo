import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
const Navbar = () => {
	const { authToken, logout } = useContext(AuthContext);
	return (
		<nav className="navbar navbar-expand-lg bg-dark navbar-dark py-4">
			<div className="container-fluid">
				<Link className="navbar-brand" to="">
					Django Todo
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						{authToken ? (
							<li
								className="nav-item text-white"
								onClick={logout}
								style={{ cursor: "pointer" }}
							>
								Logout
							</li>
						) : (
							<>
								<li className="nav-item">
									<Link className="nav-link" aria-current="page" to="/signup">
										Register
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Login
									</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
