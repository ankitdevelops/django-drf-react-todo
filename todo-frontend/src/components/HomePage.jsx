import React from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const HomePage = () => {
	return (
		<section>
			<div className="container">
				<div className="row mx-auto my-5">
					<div className="col-md-8 mx-auto card p-5">
						<h1>Ankit's Todo's </h1>
						<TodoForm />
						<TodoList />
					</div>
				</div>
			</div>
		</section>
	);
};

export default HomePage;
