/**
 * FindOne component is responsible for fetching, displaying, and managing a single Todo item.
 *
 * - Fetches the Todo data from the server when the `todoId` prop is provided and updates the state.
 * - Displays the Todo data using the `ShowView` component.
 * - Provides functionality to update, delete, or mark the Todo as complete through corresponding actions:
 *   - `onSaveHandler`: Updates the Todo with new data.
 *   - `onDeleteHandler`: Deletes the Todo after user confirmation.
 *   - `onCompleteHandler`: Marks the Todo as complete.
 *
 * @param {string} todoId - The unique identifier of the Todo to fetch.
 *
 * The component ensures that:
 * - If the `todoId` is empty, the function returns without making a request.
 * - If the Todo is successfully fetched, updates the local state with the retrieved Todo data
 *   and it is rendered with the ability to modify it.
 * - If no Todo is found or if an error occurs, appropriate feedback (e.g., "Todo not found") is displayed.
 */

import { useState, useEffect } from "react";
import ShowView from "./ShowView";

// FindOne component fetches and displays a single Todo item
function FindOne({ todoId }) {
	console.log("Entered Find One")
	const [todoItem, setTodoItem] = useState(null); // Holds the fetched todo item

	/**
	 * Fetches a single Todo item from the server by its ID.
	 *
	 * If the `todoId` is empty, the function returns without making a request.
	 * Sends a GET request to `http://localhost:3000/todos/:id` to retrieve the specified Todo.
	 *
	 * If the request is successful, updates the local state with the retrieved Todo data.
	 *
	 */
	const fetchTodo = async () => {
		// Implement fetch logic
		try{
			const requestOptions = {
				method: "GET",
				mode: "cors",
			};

			const response = await fetch(
				`http://localhost:3001/todos/${todoId}`,
				requestOptions
			);
	
			if (response.ok){ 
				const data = await response.json();
				setTodoItem(data.payload.todo);
			}	
			console.log(`Finished FetchTodo todo: ${todoId}`)
			
		}
		catch{
			console.log("ERROR!")
		}
		
	};

	useEffect(() => {
		if (!todoId) return; // Avoid fetching if todoId is empty
		setTodoItem(null)
		fetchTodo();
	}, [todoId]);

	/** TODO:
	 * Handles updating an existing Todo item by sending a PUT request to the server.
	 *
	 * @param {Object} updatedTodo - The updated Todo object containing the new title and description.
	 *
	 * Sends a request with the updated data to `http://localhost:3000/todos/:id`.
	 * If the request is successful, updates the local state with the new Todo data.
	 * Displays an alert confirming the update or an error message if the update fails.
	 */
	const onSaveHandler = async (updatedTodo) => {
		// Implement update logic
		try{
			console.log("Entered OnsaveHandler")
			const newTodo = {
				...todoItem,
				...updatedTodo,
			}

			const requestOptions = {
				method: "PUT",
				//mode: "cors",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(newTodo)
			};
			
			const response = await fetch(
				`http://localhost:3001/todos/${updatedTodo.id}`,
				requestOptions
			);

			if (response.ok){ 
				const data = await response.json();
				setTodoItem(data.payload.todo); 
			}
			alert("Successfully Saved")
		}
		catch (error){
			alert("ERROR!")
			console.log(error)
		}
		
	};

	/**
	 * Handles deleting a Todo item by sending a DELETE request to the server.
	 *
	 * Prompts the user for confirmation before proceeding with the deletion.
	 * If confirmed, sends a request to `http://localhost:3000/todos/:id` to delete the specified Todo.
	 *
	 * @param {string} todoId - The unique identifier of the Todo to delete.
	 *
	 * If the request is successful, removes the Todo from the local state.
	 * Displays an alert confirming the deletion or an error message if the deletion fails.
	 */
	const onDeleteHandler = async () => {
		// Implement delete logic
		if (confirm("Are you sure you want to delete")){
			try{
				console.log("Entered onDeleteHandler")
	
				const requestOptions = {
					method: "DELETE",
					//mode: "cors",
	
				};
				
				const response = await fetch(
					`http://localhost:3001/todos/${todoId}`,
					requestOptions
				);
	
				if (response.ok){ 
					setTodoItem(null); 
				}
				alert("Successfully Deleted")
			}
			catch (error){
				alert("Error in deletion")
				console.log(error)
			}
		}
	};


	/**
	 * Marks a Todo item as complete by sending a PUT request to the server.
	 *
	 * Sends a request to `http://localhost:3000/todos/:id/complete` with an updated status.
	 *
	 * @param {string} todoId - The unique identifier of the Todo to mark as complete.
	 *
	 * If the request is successful, displays a confirmation alert.
	 * If an error occurs, logs the error and displays an alert message.
	 */
	const onCompleteHandler = async () => {
		// Implement mark complete logic
		try{
			console.log(todoItem)
			const updatedTodo = todoItem
			updatedTodo.status = "complete"

			const requestOptions = {
				method: "PUT",
				//mode: "cors",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(updatedTodo)
			};
			
			const response = await fetch(
				`http://localhost:3001/todos/${updatedTodo.id}/complete`,
				requestOptions
			);

			if (response.ok){ 
				const data = await response.json();
				setTodoItem(data.payload.todo); 
			}
			alert("Successfully Marked Complete")
			console.log(todoItem)
		}
		catch (error){
			alert("ERROR!")
			console.log(error)
		}
	};


	if (!todoId){
		return;
	}

	if (todoItem){
		return (
			
			<ShowView
				todo={todoItem}
				onSave={onSaveHandler}
				onDelete={onDeleteHandler}
				onComplete={onCompleteHandler}
			/>
			
		);
	} else{
		return (
			<div>
				<p>
					No Todo found with that ID
				</p>
			</div>
		)
	}
	
}

export default FindOne;
