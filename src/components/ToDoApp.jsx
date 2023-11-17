import { useState } from "react";
import Todo from "./todo";

const ToDoApp = () => {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  // Ir viendo lo que escribo
  function handleChange(e) {
    const value = e.target.value;
    setTitle(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    const temp = [...todos];
    temp.unshift(newTodo);
    setTodos(temp);

    setTitle("");
  }

  // funcion para actualizar los todos
  function handleUpdate(id, value) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    setTodos(temp);
  }

  function handleDelete(id) {
    const temp = todos.filter((item) => item.id != id);
    setTodos(temp);
  }

  return (
    <div className="todocontainer">
      <form className="todoCreateForm" onSubmit={handleSubmit}>
        <input onChange={handleChange} className="todoInput" value={title} />
        <input
          onClick={handleSubmit}
          type="submit"
          value={"Agregar tarea"}
          className="buttonCreate"
        />
      </form>

      <div className="todosContainer">
        {todos.map((item) => (
          <Todo
            key={item.id}
            item={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoApp;
