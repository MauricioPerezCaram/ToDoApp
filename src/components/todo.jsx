import { useState } from "react";
export default function Todo({ item, onUpdate }) {
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
      <form className="todoactualizarform" onSubmit={handleSubmit}>
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
        {item.title} <button onClick={() => setIsEdit(true)}>Editar</button>
        <button>Eliminar</button>
      </div>
    );
  }

  return <div className="todo">{isEdit ? <FormEdit /> : <TodoElement />}</div>;
}
