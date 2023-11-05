import { useEffect, useState } from 'react';
import './App.css'

export default function App(){
  const [newItem, setNewItem] = useState("");
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem('ITEMS')
    if (localValue == null) return []
    
    return JSON.parse(localValue)
  })

  useEffect (() => {
    localStorage.setItem('ITEMS', JSON.stringify(tasks))
  }, [tasks])

  function handleSubmit(event) {
    event.preventDefault();
    
    setTasks (currentTask =>{
      return [
        ...currentTask, { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })
    
    setNewItem(" ");
  }

  function toggleTask(id, completed) {  //enables check(tick) feature
    setTasks(currentTask => {
      return currentTask.map(task => {
          if(task.id === id) {
            return { ...task, completed }
          }
        return task
      })
    })
  }

  function deleteTask (id) {
    setTasks(currentTask => {
      return currentTask.filter(task => task.id !== id )
    })
  }

  return (
    <>
      <h1>ToDo List</h1>
      <div className="body">
        <form onSubmit={handleSubmit} className="new-item-form">
          <div>
            <label htmlFor="item">New Task : </label>
            <input
              value={newItem}
              type="text"
              id="item"
              placeholder="Enter a task"
              onChange={(event) => setNewItem(event.target.value)}
              required
            />
          </div>
          <button className="btn"> Add New Task </button>
        </form>
      </div>
      <ul className="list">
        <h2> My ToDo List </h2>
        {tasks.length === 0 && "No Tasks Added :)"}
        {tasks.map((task) => {
          //returns an array in the li using the array.map() function
          return (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(event) =>
                    toggleTask(task.id, event.target.checked)
                  }
                />
                {task.title}
              </label>
              <button
                onClick={() => deleteTask(task.id)} //passing a function that calls deleteTask and passes it in the tasks.id (deletes the task)
                className="delete"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
