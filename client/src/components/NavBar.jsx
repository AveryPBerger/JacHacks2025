import { Link } from "react-router-dom";
import DisplayTodos from "./DisplayTodos";
import React from "react";

function NavBar() {
	return (
		<nav className="nav">
			<ul>
				<li>
					<strong>Assignment 3 - AB</strong>
				</li>
			</ul>

			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/list-todos">Display Todos</Link>
				</li>
				<li>
					<Link to="/todos">Create Todo</Link>
				</li>
				
				{/* Implement rest of the Links to your routes for the navigation bar.*/}
			</ul>
		</nav>
	);
}
export default NavBar;
