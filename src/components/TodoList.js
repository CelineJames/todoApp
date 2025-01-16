import axios from "axios";
import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";

const TodoList = ({ searchQuery }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = (window.innerWidth < 500) ? 7 : 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Sort todos by descending ID
  const sortTodos = (todos) => todos.sort((a, b) => b.id - a.id);

  // Fetch todos from localStorage or API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const savedTodos = JSON.parse(localStorage.getItem("todos"));
        if (savedTodos && Array.isArray(savedTodos)) {
          setTodos(sortTodos(savedTodos));
        } else {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
          );
          const sortedTodos = sortTodos(response.data);
          setTodos(sortedTodos);
          localStorage.setItem("todos", JSON.stringify(sortedTodos));
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // Filter and search todos
  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "inprogress") return !todo.completed;
      return true; // "all"
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Add a new todo
  const handleAddTodo = () => {
    if (newTodo) {
      const highestId =
        todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) : 0;
      const newTodoItem = {
        id: highestId + 1,
        title: newTodo,
        completed: false,
      };
      const updatedTodos = sortTodos([...todos, newTodoItem]);
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setNewTodo("");
      closeModal();
    }
  };

  // Remove a todo
  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Toggle completion
  const toggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo
    );
    setTodos(sortTodos(updatedTodos));
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Navigation to detail page
  const openEditPage = (todoId) => navigate(`/todo/${todoId}`);

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="todo-input">
        <button className="add-todo-btn" onClick={openModal}>
          Add Task
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          id="filter"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="inprogress">In Progress</option>
        </select>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add a New Task</h2>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a New Task"
              className="modal-input"
            />
            <button className="open-modal-btn" onClick={handleAddTodo}>
              Add Task
            </button>
            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <ul className="todo-list">
        {currentTodos.map((todo) => (
          <li key={todo.id} onClick={() => openEditPage(todo.id)}>
            {todo.title}
            <div className="li-right-div">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCompletion(todo.id);
                }}
                style={{
<<<<<<< HEAD
                  backgroundColor: todo.completed ? "#08b008" : "#d6d606",
                  // color: todo.completed ? "white" : "#08b008",

=======
                  backgroundColor: todo.completed ? "green" : "#c82333",
>>>>>>> c4d7a27 (new project)
                  cursor: "pointer",
                }}
              >
                {todo.completed ? "Completed" : "InProgress"}
              </button>
              <FaTrash
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTodo(todo.id);
                }}
                size={12}
                color="#c82333"
                cursor="pointer"
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{ opacity: currentPage === 1 ? "0.7" : "1" }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          style={{ opacity: currentPage === totalPages ? "0.7" : "1" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList;
