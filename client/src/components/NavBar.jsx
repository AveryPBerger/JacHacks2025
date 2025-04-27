import { Link } from "react-router-dom";

import React from "react";

function NavBar() {
	return (
		<nav className="nav">
	       
            
            
            <ul className="navigation">
                <li>
                     <Link to="/">Home</Link> 
                </li>
                <li>
                    <Link to="/Game">Game</Link>
                </li>
            </ul>
            {/* Implement rest of the Links to your routes for the navigation bar.*/}

		</nav>
	);
}
export default NavBar;
