import "./App.css";
import Nav from "./components/Nav.jsx";
import TodoDetail from "./components/TodoDetail.js";
import TodoList from "./components/TodoList.js";
import NotFound from "./components/NotFound.js";
import ErrorBoundary from "./components/ErrorBoundary.js";
import SimulateError from "./components/SimulatedError.js";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";





function DashBoard() {
  // const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="Dashboard">
      <Nav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TodoList searchQuery={searchQuery} />
    </div>
  );
}


function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/todo/:id" element={<TodoDetail />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/error-boundary" element={<SimulateError />}/>
          </Routes>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

