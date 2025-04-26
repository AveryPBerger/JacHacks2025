/**
 * CreateTodo Component allows users to create a new Todo item.
 *
 * - Provides a form with fields for the Todo title and description.
 * - Handles user input using state (`inputField`).
 * - Sends a POST request to the server to save the new Todo.
 * - Redirects the user to the newly created Todo's details page upon success.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

function CreateTodo() {
	const [inputField, setInputField] = useState({
		todo_title: "",
		todo_description: "",
	});

	const navigate = useNavigate();
	/**
	 * Handles input changes and updates state accordingly.
	 * @param {Event} event - The event triggered by input change.
	 */
	const inputsHandler = (event) => {
		event.preventDefault(); // prevent page reload

		const { name, value } = event.target;
	
		// Update the corresponding input field in state
		setInputField((prevState) => ({
			// prevState is the previous state before updating.
			// ...prevState ensures we keep the existing values in inputField instead of replacing everything.
			...prevState, // Keeps existing values in inputField
			[name]: value, // Updates only the changed field
		}));
	};

	/**
	 * Handles the form submission by sending a POST request to create a new Todo.
	 *
	 * @param {Event} event - The event triggered by form submission.
	 */
	const submitHandler = async (event) => {
		// try{
			event.preventDefault()
			console.log(`Title: ${inputField.todo_title}`)

			const newTodo = {
				title: inputField.todo_title,
				description: inputField.todo_description,
			}
			console.log(newTodo)
			const requestOptions = {
				method: "POST",
				//mode: "cors",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(newTodo)
			};
			
			const response = await fetch(
				`http://localhost:3001/todos`,
				requestOptions
			);
			console.log(`RESPONSE: ${response}`)
			
			const allTodosResponse = await fetch("http://localhost:3001/todos");
			const allTodosData = await allTodosResponse.json();
	
			const todos = allTodosData.payload.todos;
		
			const latestTodo = todos[todos.length - 1];

			console.log(`Latest Todo: ${latestTodo}`)
			if (latestTodo.id){	
				alert("Successfully Marked Complete")
				navigate(`/todos/${latestTodo.id}`);
			}
	
	
			


		// }catch (error){
		// 	console.log(`ERROR! ${error}`)
		// }
	};

	/**
	 * refer to for tips https://react.dev/reference/react-dom/components/input
	 */
	return (
		<div>
			<h3>Create a new Todo</h3>
			<table>
				<tbody>
					<tr>
						<td>Title</td>
						<td>
						{/* Input field for Todo title */
							<input
								type="text"
								name="todo_title"
								onChange={inputsHandler}
								value={inputField.todo_title}
							/>
						}
						</td>
					</tr>
					<tr>
						<td>Description</td>
						<td>
						{/* Input field for Todo description */
					
						<input
							type="text"
							name="todo_description"
							onChange={inputsHandler}
							value={inputField.todo_description}
						/>}
						</td>
					</tr>
				</tbody>
			</table>
			<button onClick={submitHandler}>Create</button>
		</div>
	);
}

export default CreateTodo;
