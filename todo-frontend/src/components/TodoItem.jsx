import { Link } from "react-router-dom";
import { useContext } from "react";
import TodoContext from "../context/TodoContext";
const TodoItem = ({ title, status, date, id }) => {
	const { markComplete, deleteTodo } = useContext(TodoContext);

	const onClick = () => {
		markComplete(id, status);
	};

	const handleDelete = () => {
		deleteTodo(id);
	};

	return (
		<li className="list-group-item p-3">
			<div className="d-flex justify-content-between">
				<div className="d-flex">
					<input
						className="form-check-input"
						type="checkbox"
						id="gridCheck"
						defaultChecked={status ? true : false}
						onClick={onClick}
					/>
					<span
						className={
							status
								? "ms-2 d-flex align-items-center text-decoration-line-through"
								: "ms-2 d-flex align-items-center "
						}
					>
						{title}
					</span>
				</div>
				<div className="">
					<span>{date}</span>
					<span className="ms-2">
						<Link
							to=""
							className="text-decoration-none link-dark"
							onClick={handleDelete}
						>
							<i className="bi bi-trash"></i>
						</Link>
					</span>
				</div>
			</div>
		</li>
	);
};

export default TodoItem;
