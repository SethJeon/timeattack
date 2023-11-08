import React, { useState } from "react";

function onChangeHandler(e, currentTodo, setCurrentTodo) {
  const { name, value } = e.target;
  setCurrentTodo({
    ...currentTodo,
    [name]: value,
  });
}

function onSubmitHandler(e, currentTodo, setCurrentTodo, todos, setTodos) {
  e.preventDefault();
  if (currentTodo.title.trim() !== "" && currentTodo.body.trim() !== "") {
    setTodos([...todos, currentTodo]);
    setCurrentTodo({
      id: currentTodo.id + 1,
      title: "",
      body: "",
      isDone: false,
    });
  }
}

function toggleTodo(id, todos, setTodos) {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    )
  );
}

function moveToCompleted(
  id,
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos
) {
  const todoToMove = todos.find((todo) => todo.id === id);
  if (todoToMove) {
    setCompletedTodos([...completedTodos, todoToMove]);
    setTodos(todos.filter((todo) => todo.id !== id));
  }
}

function cancelCompleted(
  id,
  completedTodos,
  setCompletedTodos,
  todos,
  setTodos
) {
  const todoToCancel = completedTodos.find((todo) => todo.id === id);
  if (todoToCancel) {
    setTodos([...todos, todoToCancel]);
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
  }
}

function deleteTodo(id, todos, setTodos) {
  setTodos(todos.filter((todo) => todo.id !== id));
}

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState({
    id: 0,
    title: "",
    body: "",
    isDone: false,
  });

  return (
    <div>
      <h1>Todo List</h1>
      <form
        onSubmit={(e) =>
          onSubmitHandler(e, currentTodo, setCurrentTodo, todos, setTodos)
        }
      >
        <input
          type="text"
          name="title"
          placeholder="할일"
          value={currentTodo.title}
          onChange={(e) => onChangeHandler(e, currentTodo, setCurrentTodo)}
        />
        <input
          type="text"
          name="body"
          placeholder="내용"
          value={currentTodo.body}
          onChange={(e) => onChangeHandler(e, currentTodo, setCurrentTodo)}
        />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.isDone ? "line-through" : "none",
              }}
            >
              {todo.title}: {todo.body}
            </span>
            <button
              onClick={() =>
                moveToCompleted(
                  todo.id,
                  todos,
                  setTodos,
                  completedTodos,
                  setCompletedTodos
                )
              }
            >
              Done
            </button>
            <button onClick={() => deleteTodo(todo.id, todos, setTodos)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2>Completed List</h2>
      <ul>
        {completedTodos.map((todo) => (
          <li key={todo.id}>
            <span>
              {todo.title}: {todo.body}
            </span>
            <button
              onClick={() =>
                cancelCompleted(
                  todo.id,
                  completedTodos,
                  setCompletedTodos,
                  todos,
                  setTodos
                )
              }
            >
              cancel
            </button>
            <button
              onClick={() =>
                deleteTodo(todo.id, completedTodos, setCompletedTodos)
              }
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
