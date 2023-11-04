import { useEffect, useState } from 'react';
import { TaskForm } from "./TaskForm";
import { ToDoList } from "./ToDoList";
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
      <ToDoList ToDos={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </>
  );
}
