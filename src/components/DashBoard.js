import Nav from "./Nav";
import { TodoList } from "../App";
import { React, useState } from "react";


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

export default DashBoard();
