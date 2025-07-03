import React, { useState, useEffect } from "react";

function ToDoList() {
  const [toDos, setToDos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");


  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("pending"); // Estado para editar

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3245/tasks");
      if (!response.ok) throw new Error("Error al obtener tareas");
      const data = await response.json();
      setToDos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async () => {
    if (title.trim() === "" || description.trim() === "") return;
    try {
      const response = await fetch("http://127.0.0.1:3245/tasks", {
        method: "POST",
        body: JSON.stringify({ title, description, status }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Error al crear la tarea");
      await getTasks();
      setTitle("");
      setDescription("");
      setStatus("pending");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:3245/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar tarea");
      await getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, updatedTitle, updatedDescription, updatedStatus) => {
    if (updatedTitle.trim() === "" || updatedDescription.trim() === "") return;
    try {
      const response = await fetch(`http://127.0.0.1:3245/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: updatedTitle,
          description: updatedDescription,
          status: updatedStatus,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Error al actualizar tarea");
      await getTasks();
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = () => {
    if (toDos.length === 0) return <p>No hay tareas pendientes</p>;
    if (toDos.length === 1) return <p>Hay una tarea pendiente</p>;
    return <p>Hay {toDos.length} tareas pendientes</p>;
  };

 return (
    <div className="container">
      <h1>Lista de tareas</h1>

      <form
        className="add-task-form"
        onSubmit={(e) => {
          e.preventDefault();
          createTask();
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción de la tarea"
        />
        {/* Eliminamos el select para estado */}
        <button type="submit">Añadir tarea</button>
      </form>

      <ul className="todo-list">
        {toDos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Editar título"
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Editar descripción"
                />
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                >
                  <option value="pending">Pendiente</option>
                  <option value="in_progress">En progreso</option>
                  <option value="done">Hecho</option>
                </select>
                <div className="actions">
                  <button
                    onClick={() =>
                      updateTask(todo.id, editTitle, editDescription, editStatus)
                    }
                    disabled={
                      editTitle.trim() === "" || editDescription.trim() === ""
                    }
                  >
                    Guardar
                  </button>
                  <button onClick={() => setEditingId(null)}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
                <div className="todo-text">
                  <strong>{todo.title}</strong>
                  <span>{todo.description}</span>
                  <small>
                    Estado:{" "}
                    {{
                      pending: "pendiente",
                      in_progress: "en progreso",
                      done: "realizada",
                    }[todo.status] || todo.status}
                  </small>
                </div>
                <div className="actions">
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditTitle(todo.title);
                      setEditDescription(todo.description);
                      setEditStatus(todo.status);
                    }}
                    aria-label="Editar tarea"
                    className="edit-button"
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => deleteTask(todo.id)}
                    className="delete-button"
                    aria-label="Eliminar tarea"
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <div>{renderContent()}</div>
    </div>
  );
}

export default ToDoList;
