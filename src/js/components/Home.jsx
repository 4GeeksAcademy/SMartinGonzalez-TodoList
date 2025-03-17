import React ,{ useState, useEffect } from "react";


const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Cargo tareas (GET)
  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/SMartinGonzalez")
	.then((response)=>{
		console.log(response)
		return response.json()
	})
      .then((data) => {
		console.log(data)
          setTodos(data.todos);
      })
      .catch((err) => console.error("Error al obtener tareas:", err));
  }, []);

  // Agrego una nueva tarea (POST)
  const addTask = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTask = { label: inputValue, done: false };

      fetch("https://playground.4geeks.com/todo/todos/SMartinGonzalez", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((createdTask) => {
          setTodos([...todos, createdTask]); 
        })
        .catch((err) => console.error("Error al agregar tarea:", err));
    }
  };

  // Elimino una tarea
  const deleteTask = (taskId) => {
    fetch(`${"https://playground.4geeks.com/todo/todos"}/${taskId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTodos(todos.filter((task) => task.id !== taskId)); 
      })
      .catch((err) => console.error("Error al eliminar tarea:", err));
  };

  // Actualizo una tarea
  const markTaskAsDone = (taskId) => {
    const updatedTodos = todos.map((task) =>
      task.id === taskId ? { ...task, is_done: true } : task
    );

    // Actualizo la tarea en el servidor con PUT
    fetch(`${"https://playground.4geeks.com/todo/todos"}/${taskId}`, {
      method: "PUT",
      body: JSON.stringify({ is_done: true }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        setTodos(updatedTodos);
      })
      .catch((err) => console.error("Error al actualizar la tarea:", err));
  };
  

  // Limpiar todas las tareas (DELETE)
  const clearAllTasks = () => {
    Promise.all(todos.map((task) => fetch(`${"https://playground.4geeks.com/todo/todos"}/${task.id}`, { method: "DELETE" })))
      .then(() => setTodos([])) 
      .catch((err) => console.error("Error al limpiar tareas:", err));
  };

  return (
    <div className="container">
      <h1>Todos</h1>
      <ul>
        <li>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={addTask}
            placeholder="What do you need to do?"
          />
        </li>
        {todos.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.is_done ? "line-through" : "none",
              color: task.is_done ? "gray" : "black", 
            }}
          >
            {task.label}
            {" "}
            {/* Botón para marcar la tarea como completada */}
            {!task.is_done && (
              <button
                onClick={() => markTaskAsDone(task.id)}
                style={{ marginLeft: "10px" }}
              >
                ✔️
              </button>
            )}
            {/* Botón para eliminar la tarea */}
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      <div>{todos.length === 0 ? "No hay tareas, añadir tareas" : `${todos.length} task/s left`}</div>
      <button onClick={clearAllTasks} className="btn btn-danger mt-2">Borrar todas las tareas</button>
    </div>
  );
};

export default Home;