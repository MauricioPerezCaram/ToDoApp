import { useState } from "react";

export default function Todo({ item, onUpdate, onDelete }) {
  const [isEdit, setIsEdit] = useState(false);

  function FormEdit() {
    const [newValue, setNewValue] = useState(item.title);

    function handleSubmit(e) {
      e.preventDefault();
    }

    function handleChange(e) {
      const value = e.target.value;
      setNewValue(value);
    }

    function handleClickActualizarTodo() {
      onUpdate(item.id, newValue);
      setIsEdit(false);
    }

    return (
      <form className="todoUpdateForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todoInput"
          onChange={handleChange}
          value={newValue}
        />
        <button className="button" onClick={handleClickActualizarTodo}>
          Actualizar
        </button>
      </form>
    );
  }

  function TodoElement() {
    return (
      <div className="todoInfo">
        <span
          className={`todoTitle ${item.completed ? "completed" : ""}`}
          onClick={() => onUpdate(item.id, item.title, !item.completed)}
        >
          {item.title}
        </span>
        <div className="buttonContainer">
          <button className="button" onClick={() => setIsEdit(true)}>
            Editar
          </button>
          <button
            className="button"
            onClick={() => onUpdate(item.id, item.title, !item.completed)}
          >
            Tachar
          </button>
          <button className="buttonEliminar" onClick={(e) => onDelete(item.id)}>
            Eliminar
          </button>
        </div>
      </div>
    );
  }

  return <div className="todo">{isEdit ? <FormEdit /> : <TodoElement />}</div>;
}
