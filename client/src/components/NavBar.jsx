import { Link } from "react-router-dom";

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
					<Link to="/game">Game</Link>
				</li>
				<li>
					<Link to="/summary">Summary</Link>
				</li>
				
				{/* Implement rest of the Links to your routes for the navigation bar.*/}
			</ul>
		</nav>
	);
}
export default NavBar;
