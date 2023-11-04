/* eslint-disable react/prop-types */
import { useState } from "react"

export default function TaskForm({ addTasks }) {
  const [newItem, setNewItem] = useState("")

  function handleSubmit(event) {
    event.preventDefault();
    if (newItem === " ") return
    addTasks(newItem)
    setNewItem(" ");
  }

  return (
    <div className="body">
    <form onSubmit={handleSubmit} className="new-item-form">
      <div>
        <label htmlFor="item">New Task</label>
        <input
          value={newItem}
          type="text"
          id="item"
          placeholder="Enter a task"
          onChange={event => setNewItem(event.target.value)}
          required
        />
      </div>
      <button className="btn"> Add New Task </button>
    </form>
  </div>
  )
}
