/**
 * `DisplayOne` Component
 *
 * This component allows the user to enter a Todo ID and fetch its details.
 *
 * - An input field where users can enter a Todo ID.
 * - A label explaining that the entered ID will be used to fetch a specific Todo.
 * - The `FindOne` component, which takes the entered Todo ID and retrieves the corresponding Todo from the database.
 *
 * ## State Management:
 * - Uses `useState` to store the input values (`todo_id`).
 * - The `inputsHandler` function updates the state dynamically when the user types in the input field.
 *
 * This component serves as an interface for users to search for a single Todo by its ID.
 */
import { useState } from "react";

import FindOne from "./FindOne";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


export default function DisplayOne() {
	const { id: paramId } = useParams();
	const [todo_id, setTodoId] = useState("");

	useEffect(() => {
		if (paramId) {
			setTodoId(paramId);
		}
	}, [paramId]);
	
	const handleInputChange = (e) => {
		setTodoId(e.target.value);
	};

	return (
		<div>
			<h3>Single Todo</h3>
			<input
				type="number"
				placeholder="Enter ID"
				value={todo_id}
				onChange={handleInputChange}
			/>
			<br />
			<FindOne todoId={todo_id} />
		</div>
	);
}
