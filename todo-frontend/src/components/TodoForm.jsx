import React, { useContext, useEffect, useState } from "react";
import TodoContext from "../context/TodoContext";

const TodoForm = () => {
	const [task, setTask] = useState("");
	const { addTodo } = useContext(TodoContext);
	const todo = {
		title: task,
	};
	const onSubmit = (e) => {
		e.preventDefault();
		addTodo(todo);
		setTask("");
	};

	return (
		<form className="row" onSubmit={onSubmit}>
			<div className="col-md-10">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="What's Your Task"
						value={task}
						onChange={(e) => setTask(e.target.value)}
					/>
				</div>
			</div>
			<div className="col-md-2">
				<div className="d-grid gap-2">
					<button className="btn btn-dark" type="submit">
						Add
					</button>
				</div>
			</div>
		</form>
	);
};

export default TodoForm;
