import { React } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import { TodoProvider } from "./context/TodoContext";
import PrivateRoute from "./utils/PrivateRoute";
function App() {
	return (
		<AuthProvider>
			<TodoProvider>
				<Navbar />
				<Routes>
					<Route element={<PrivateRoute />}>
						<Route path="/" exact element={<HomePage />} />
					</Route>
					<Route path="/login" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</TodoProvider>
		</AuthProvider>
	);
}

export default App;
