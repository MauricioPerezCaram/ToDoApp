import { useEffect, useState } from "react";
import Todo from "./todo";

const listaInicial = JSON.parse(localStorage.getItem("lista")) || [];

const ToDoApp = () => {
  const [title, setTitle] = useState("");
  // Ajuste en la inicialización de "todos"
  const [todos, setTodos] = useState(listaInicial);

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

  function handleUpdate(id, value, completed) {
    const temp = [...todos];
    const item = temp.find((item) => item.id === id);
    item.title = value;
    item.completed = completed;
    console.log("Updated Todo:", item);
    setTodos(temp);
  }

  function handleDelete(id) {
    const temp = todos.filter((item) => item.id !== id);
    setTodos(temp);
  }

  useEffect(() => {
    localStorage.setItem("lista", JSON.stringify(todos));
  }, [todos]);

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
