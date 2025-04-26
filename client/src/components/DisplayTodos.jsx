import React from "react";
/**
 * `DisplayTodos` Component
 *
 * A simple navigation component that provides links to display different lists of Todos.
 * - A list with two navigation links:
 *   - "List all Todos" → Navigates to `/list-all`, where all Todos are displayed.
 *   - "Display a Single Todo" → Navigates to `/list-one`, where a single Todo can be viewed.
 * This component serves as a menu for users to choose how they want to view Todos
 */
const DisplayTodos = () => {
	return (
		<div>
			<h4>All Todos</h4>
			<ul>
				<li>
					<a href="/list-all">List all Todos</a>
				</li>
				<li>
					<a href="/list-one">Display a Single Todo</a>
				</li>
			</ul>
		</div>
	);
};

export default DisplayTodos;
