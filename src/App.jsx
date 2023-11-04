import { useEffect, useState } from 'react';
import { TaskForm } from "./TaskForm";
import './App.css'

export default function App(){
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem('ITEMS')
    if (localValue == null) return []
    
    return JSON.parse(localValue)
  })

  useEffect (() => {
    localStorage.setItem('ITEMS', JSON.stringify(tasks))
  }, [tasks])

  function addTask(title){
    setTasks((currentTask) => {
      return [
        ...currentTask,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    })
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
      <TaskForm addTasks={addTask} />
      <ul className="list">
      <h2> My ToDo </h2>
      {tasks.length === 0 && "No Tasks Added :("}
      {tasks.map((task) => {//returns an array in the li using the array.map() function
        return (
          <li key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(event) => toggleTask(task.id, event.target.checked)}
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
