import React, { useContext, useEffect } from "react";

import TodoContext from "../context/TodoContext";

import TodoItem from "./TodoItem";
const TodoList = () => {
	const { getTodos, todos } = useContext(TodoContext);
	useEffect(() => {
		getTodos();
	}, []);
	return (
		<ul className="list-group mt-2">
			{todos.map((todos) => (
				<TodoItem
					key={todos.id}
					title={todos.title}
					status={todos.status}
					date={todos.created_at}
					id={todos.id}
				/>
			))}
		</ul>
	);
};

export default TodoList;
