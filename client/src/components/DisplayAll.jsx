/**
 * DisplayAll Component fetches and displays a list of Todos with the ability to filter and sort.
 * - Fetches Todos from the server based on query parameters that include sorting and filtering criteria.
 * - Allows the user to filter Todos by status and sort them by title, creation date, or due date.
 * - Displays Todos in a table with clickable links to view individual Todo details.
 *
 * The component handles the following:
 * 1. State management for Todos and input filters.
 * 2. Fetching the list of Todos from the server and updating the UI.
 * 3. Handling filter changes and applying them to the request URL.
 */
// import the required libraries
import React from "react";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";

const DisplayAll = () => {
	const [todos, setTodos] = useState([]);
	const [statusFilter, setStatusFilter] = useState("");
	const [sortBy, setSortBy] = useState("");
	const [sortOrder, setSortOrder] = useState("asc");
	const [applyTrigger, setApplyTrigger] = useState(0);

	/**
	 * Fetches the list of Todos based on the current filter and sorting options.
	 * Sends a GET request to the server with query parameters constructed from the filter values.
	 * Updates the Todos state with the fetched data.
	 */
	const getAll = async () => {
		//Implement the required code,
		let url = `http://localhost:3001/todos`;

		const params = new URLSearchParams();

		if (statusFilter) params.append("status", statusFilter);
		if (sortBy) params.append("sortBy", sortBy);
		if (sortOrder) params.append("order", sortOrder);

		if ([...params].length > 0) url += `?${params.toString()}`;

		const todoResponses = await fetch(url)
		const data = await todoResponses.json();
		setTodos(data.payload.todos);
		//console.log(data.payload.todos)
	};

	useEffect(() => {
		getAll();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [applyTrigger]);

	const handleApply = () => {
		setApplyTrigger((prev) => prev + 1); // triggers fetchTodos
	};

	return (
		<div>
			<h4>List of all the Todos</h4>
			<div>
				<label>
					Status:{" "}
					<select onChange={(e) => setStatusFilter(e.target.value)}>
						<option value="">All</option>
						<option value="complete">Complete</option>
						<option value="incomplete">Incomplete</option>
					</select>
				</label>

				<label>
					Sort By:{" "}
					<select onChange={(e) => setSortBy(e.target.value)}>
						<option value="">None</option>
						<option value="title">Title</option>
						<option value="createdAt">Created Date</option>
						<option value="dueAt">Due Date</option>
					</select>
				</label>

				<label>
					Order:{" "}
					<select onChange={(e) => setSortOrder(e.target.value)}>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</label>

				<button onClick={handleApply} style={{ marginLeft: "1rem" }}>
					Apply
				</button>
			</div>
			
			<table>
				<tbody>
					<tr>
						<th>Title</th>
						<th>Description</th>
						<th>Status</th>
						<th>Due At</th>
					</tr>
					{/*Implement the code, map through the todos to display them*/
							todos.map((todo) =>(
								<tr key={todo.id}>
									<th>
										<Link to={`/todos/${todo.id}`}>{todo.title}</Link>
									</th>
									<th>{todo.description}</th>
									<th>{todo.status}</th>
									<th>{todo.dueAt || "No Due Date"}</th>
								</tr>
							))
						}
				</tbody>
			</table>
		</div>
	);
};

export default DisplayAll;
