import { createContext, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	const [todo, setTodo] = useState([]);
	const token = localStorage.getItem("authToken")
		? JSON.parse(localStorage.getItem("authToken"))
		: null;
	const getTodos = async () => {
		const response = await fetch("http://127.0.0.1:8000/api/", {
			method: "GET",
			headers: {
				Authorization: `Token ${token}`,
			},
		}).catch((err) => {
			console.log(err);
		});

		const data = await response.json();
		if (data) {
			setTodo(data);
		}
	};

	const addTodo = async (todo) => {
		const response = await fetch("http://127.0.0.1:8000/api/", {
			method: "POST",
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todo),
		}).catch((err) => {
			console.log(err);
		});

		const data = await response.json();
		if (data) {
			setTodo((todo) => [data, ...todo]);
		}
	};

	const markComplete = async (id, status) => {
		const response = await fetch(`http://127.0.0.1:8000/api/${id}/`, {
			method: "PATCH",
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				status: !status,
			}),
		}).catch((err) => {
			console.log(err);
		});
		const data = await response.json();
		if (data) {
			setTodo((todo) => [data, ...todo.filter((item) => item.id !== id)]);
		}
	};

	const deleteTodo = async (id) => {
		await fetch(`http://127.0.0.1:8000/api/${id}/`, {
			method: "DELETE",
			headers: {
				Authorization: `Token ${token}`,
				"Content-Type": "application/json",
			},
		}).catch((err) => {
			console.log(err);
		});
		setTodo((todo) => [...todo.filter((item) => item.id !== id)]);
	};

	let contextData = {
		todos: todo,
		getTodos: getTodos,
		addTodo: addTodo,
		markComplete: markComplete,
		deleteTodo: deleteTodo,
	};
	return (
		<TodoContext.Provider value={contextData}>{children}</TodoContext.Provider>
	);
};

export default TodoContext;
