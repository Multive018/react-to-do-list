/* eslint-disable react/prop-types */
import './App.css'
export default function ToDoItem({ completed, id, title, toggleTask, deleteTask }) {
  return(
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(event) => toggleTask(id, event.target.checked)}
        />
        {title}
      </label>
      <button
        onClick={() => deleteTask(id)} //passing a function that calls deleteTask and passes it in the tasks.id (deletes the task)
        className="delete"
      >
        Delete
      </button>
    </li>
  );
}