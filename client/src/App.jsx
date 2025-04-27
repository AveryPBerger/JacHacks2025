/**
 * The `App` component serves as the main entry point of the application.
 * It sets up routing, renders navigation components, and determines which
 * page should be displayed based on the URL.
 */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import NavBar from "./components/NavBar";

import Home from "./components/Home";
import Game from "./components/Game";
import UtilityDisplay from "./components/DisplayUtility"; // Import your utility component

function App() {
  return (
    <>
      <Router
        future={{
          v7_startTransition: true,
        }}
      >
        <div className="container">
          <NavBar />
          <article>
            <Routes>
              {/*Define application routes for your application*/}
              <Route path="/" element={<Home />} />
              <Route path="/Game" element={<Game />} />
              <Route path="/utility/:utilityId" element={<UtilityDisplay />} /> {/* Add route for utility display */}
            </Routes>
          </article>
        </div>
      </Router>
    </>
  );
}

export default App;