import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	const [hoveredTask, setHoveredTask] = useState(null);
  
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
			  onKeyDown={(e) => {
				if (e.key === "Enter" && inputValue.trim() !== "") {
				  setTodos([...todos, inputValue]);
				  setInputValue("");
				}
			  }}
			  placeholder="What do you need to do?"
			/>
		  </li>
		  {todos.map((item, index) => (
			<li
			  key={index}
			  onMouseEnter={() => setHoveredTask(index)}
			  onMouseLeave={() => setHoveredTask(null)}
			>
			  {item}{" "}
			  {hoveredTask === index && (
				<i
				  className="fa-solid fa-x"
				  onClick={() =>
					setTodos(todos.filter((_, currentIndex) => index !== currentIndex))
				  }
				></i>
			  )}
			</li>
		  ))}
		</ul>
		<div>
        {todos.length === 0 ? (
          <span>
            No hay tareas, añadir tareas
          </span>
        ) : (
          `${todos.length} task/s left`
        )}
      </div>
    </div>
  );
};

export default Home;