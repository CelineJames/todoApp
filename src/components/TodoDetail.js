// import axios from "axios";
// import { FaTrash } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const sortTodos = (todos) => {
    return todos.sort((a, b) => b.id - a.id);
  };

  const startEditing = (id, currentTitle) => {
    setIsEditing(id);
    setEditText(currentTitle);
  };

  const handleEditTodo = (id) => {
    const updatedTodos = sortTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editText } : todo
      )
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setIsEditing(null);
    setEditText("");
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
      const selectedTodo = savedTodos.find((todo) => todo.id === Number(id));
      setTodo(selectedTodo);
    }
  }, [id]);

  if (!todo) return <p>Loading...</p>;
  const HomePage = () => navigate(`/`);

  return (
    <div className="todo-detail">
      <h1>Task {todo.id}</h1>
      <div className="todo-detail-title">
        <strong>Title:</strong>
        {isEditing === todo.id ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEditTodo(todo.id);
              }}
            >
              Save
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(null);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <p className="title">{todo.title}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startEditing(todo.id, todo.title);
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>
      <p style={{ marginBottom: "1rem" }}>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Status: </strong>
        <span
          style={{
            fontWeight: "bold",
            color: todo.completed ? "green" : "#c82333",
          }}
        >
          {todo.completed ? "Completed" : "In Progress"}
        </span>
      </p>
      <div className="button-div">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // handleEditTodo(todo.id);
            HomePage();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default TodoDetail;
