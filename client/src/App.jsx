/**
 * The `App` component serves as the main entry point of the application.
 * It sets up routing, renders navigation components, and determines which
 * page should be displayed based on the URL.
 */
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import DisplayTodos from "./components/DisplayTodos";
import NavBar from "./components/NavBar";

import Home from "./components/Home";
import DisplayAll from "./components/DisplayAll";
import DisplayOne from "./components/DisplayOne";
import CreateTodo from "./components/CreateTodo";


//you will need to create and import required components based on your routes.
function App() {
	return (
		<>
			<Router
				future={{
					v7_startTransition: true,
				}}
			>
				<div className="container">
					<NavBar/>
					<article>
						<Routes>
							{/*Define application  routes for your application*/}
							<Route path="/" element={<Home />} />
							<Route
								path="/list-todos"
								element={<DisplayTodos />}
							/>
							<Route 
								path="/list-all" 
								element={<DisplayAll/>}
							 />
							<Route 
								path="/list-one" 
								element={<DisplayOne/>}
							 />
							<Route
								path="/todos"
								element={<CreateTodo/>}
							/>
							<Route path="/todos/:id" element={<DisplayOne />} />

							
						</Routes>
					</article>
				</div>
			</Router>
		</>
	);
}

export default App;
