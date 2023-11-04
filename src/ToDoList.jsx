/* eslint-disable react/prop-types */
import './App.css'
import { ToDoItem } from "./ToDoItem";

export default function ToDoList({ToDos, toggleTask, deleteTask}){


  return (
    <ul className="list">
      <h2> My ToDo  List </h2>
      {ToDos.length === 0 && "No Tasks Added :("}
      {ToDos.map(task => {       //returns an array in the li using the array.map() function
        return (
          <ToDoItem 
          {...task}              //spread out the passed props so that it can pass the props to ToDoItem 
          key={task.id}
          toggleTask = {toggleTask}
          deleteTask = {deleteTask}
          />
        );
      })}
    </ul>
  );
}