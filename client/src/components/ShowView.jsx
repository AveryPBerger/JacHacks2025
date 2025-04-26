/**
 * `ShowView` Component
 *
 * This component displays a Todo item's details and allows the user to :
 * edit, delete, or mark it as complete.
 *
 * Props:
 * @param {Object} todo - The Todo object containing the initial data (id, title, description, status, dueDate).
 * @param {Function} onSave - A callback function triggered when the user saves the updated Todo.
 * @param {Function} onDelete - A callback function triggered when the user deletes the Todo.
 * @param {Function} onComplete - A callback function triggered when the user marks the Todo as complete.
 *
 * ## State:
 * - `inputField`: Stores the editable state of the Todo (id, title, description, status, completed, dueDate).
 *
 * ## Handlers:
 * - `inputsHandler`: Updates the state when any input field changes (e.g., title, description, completed).
 * - `handleDateChange`: Specifically updates the due date when a user selects a new date.
 * - `onSaveHandler`: Triggered when the user clicks "Save" to persist the updated Todo.
 * - `onCancel`: Resets the form to the original Todo values.
 * - `markAsComplete`: Marks the Todo as complete and disables further edits.
 *
 * ## Layout:
 * - Displays a table of Todo details with editable fields for title, description, and other fields.
 * - Provides action buttons to edit, mark as complete, delete, save, and cancel changes.
 * - Conditional rendering of buttons based on state for ex `inEdit` state (edit mode).
 *
 *
 * This component allows for both viewing and updating a Todo's details with validation and state management.
 */
import React, { useState } from "react";

function ShowView({ todo, onSave, onDelete, onComplete }) {
	const [inputField, setInputField] = useState({
		id: todo.id,
		title: todo.title,
		description: todo.description,
		completed: todo.status === "complete" ? true : false, // Automatically set completed if status is "completed"
		dueDate: todo.dueAt,
	});

	const [inEdit, setInEdit] = useState(false);

	/**
	 * Handles input changes for all editable fields.
	 * Updates the state with new values entered by the user.
	 *
	 * @param {Event} e - The input change event.
	 */
	const inputsHandler = (e) => {
		const { name, value } = e.target;

		setInputField((prevState) => ({
			//You will need to modify this based on what other fields you are updating.ex dueDate or status
			...prevState, // Keeps existing values in inputField
			[name]: value, // Updates only the changed field
		}));
		console.log(inputField)
	};

	// Handle date selection separately for the due date
	const handleDateChange = (date) => {
		//Implement required code.
	};

	/**
	 * Saves the updated Todo when the user clicks "Save"
	 * and  triggers the `onSave` callback.
	 */
	const onSaveHandler = async () => {
		setInEdit(false);
		onSave(inputField);
	};

	/**
	 * Cancels the edit mode and resets the form to the original Todo values.
	 */
	const onCancel = () => {
		setInputField({
			id: todo.id,
			title: todo.title,
			description: todo.description,
			completed: todo.status === "complete",
			dueDate: todo.dueAt,
		});
		setInEdit(false);
		// implement code to setInputField
	};
	/**
	 * Marks the Todo as complete.
	 * Disables further edits and triggers the `onComplete` callback.
	 */
	const markAsComplete = () => {
		// implement code to setInputField
		console.log(inputField.completed)
		onComplete()
		inputField.completed = true
		console.log("Completed Done:")
		console.log(inputField.completed)
	};

	return (
		<div>
			<h3>Todo</h3>
			<table>
				<tbody>
					<tr>
						<td className="label">Completed</td>
						<td>
							<input
								type="checkbox"
								name="completed"
								onChange={inputsHandler}
								checked={inputField.completed} // Bind the checked attribute to the state
								disabled={!inEdit} // Conditionally set readOnly
							/>
						</td>
					</tr>
					<tr>
						<td className="label">Name</td>
	
						<td>
							
							<input
							type="text"
							name="title"
							onChange={inputsHandler}
							value={inputField.title} 
							readOnly={!inEdit}/>
						
						
						</td>
					</tr>
					<tr>
						<td className="label">Description</td>
						<td>
					
							<input
								type="text"
								name="description"
								onChange={inputsHandler}
								value={inputField.description} 
								readOnly={!inEdit}/>
							
						</td>
					</tr>
					<tr>
						<td className="label">Due Date</td>
						<td>
						<input type="date" onChange={inputsHandler} value={inputField.dueAt} readOnly={!inEdit} /> 
						
						</td>
					</tr>
				</tbody>
			</table>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				{/* Add the handlers for onClick*/}
				<button onClick={() => setInEdit(true)} 
				style={
					inEdit? 
					{
						display: "none",
					}: 
					{
						display: "flex"
					}
				}>Edit</button>
				<button onClick={markAsComplete}
				style = {
					inEdit? 
					{
						display: "none",
					}: 
					{
						display: "flex"
					}
				}>Mark Complete</button>
				<button onClick={onDelete}
				style = {inEdit? 
					{
						display: "none",
					}: 
					{
						display: "flex"
					}
				}>Delete</button>
				<button onClick={onSaveHandler}
				style = {inEdit? 
					{
						display: "flex",
					}: 
					{
						display: "none"
					}
				}>Save</button>
				<button onClick={onCancel}
				style = {inEdit? 
					{
						display: "flex",
					}: 
					{
						display: "none"
					}
				}>Cancel</button>
			</div>
		</div>
	);
}

export default ShowView;
