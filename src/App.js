import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import {useState, useEffect} from 'react';

const name = "Vishal R. Dolare";
const flag = false;
function App() {    
  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    const callTasks=async()=>{
      let tasks = await fetchTasks();
      setTasks(tasks)
    }
    callTasks();
  },[])

 // Fetch tasks from backend
 const fetchTasks = async()=>{
   const response = await fetch("http://localhost:5000/tasks");
   return await response.json();
 }
 // Fetch task by id
 const fetchTask = async(id)=>{
   const response = await fetch(`http://localhost:5000/tasks/${id}`);
   return await response.json();
 } 
// Delete Task
const deleteTask = async(id)=>{
  const response = await fetch(`http://localhost:5000/tasks/${id}`,
  {method:'DELETE'})
  setTasks(tasks.filter((task)=> task.id !== id));
}

// Set reminder
const setReminder=async (id)=>{
  console.log("Set reminder : ",id);
  let taskToToggle = await fetchTask(id);
  console.log("taskToToggle : ",taskToToggle);
  const updatedTask = {...taskToToggle, reminder:!taskToToggle.reminder}
  console.log("Updated task :",updatedTask);
  let updateTaskResponse = await fetch(`http://localhost:5000/tasks/${id}`,
   {  
     method:'PUT',
     headers:{
       "Content-type":"application/json"
     },
     body:JSON.stringify(updatedTask)
   })
   let data = await updateTaskResponse.json();  
  setTasks(tasks.map((task)=>{return task.id === id?{...task,reminder:data.reminder}:task}))
}

// Add Task
const addTask = async(task)=>{
  console.log("Add task function get called...!",task);
  // const id = Math.floor(Math.random() *10000)+1;
  // console.log(id);
  // const newTask = {id, ...task}
  let response = await fetch("http://localhost:5000/tasks",
  {
    method:'POST',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(task)
  })
  let savedTask = await response.json();
  setTasks([...tasks, savedTask]);
}
  return (
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask}></Header>
      {showAddTask && <AddTask addTask={addTask}></AddTask>}
      {tasks.length > 0 ?<Tasks tasks={tasks} onDelete={deleteTask} reminder={setReminder}></Tasks>:<h3>None of the task found.</h3>}
    </div>
  );
}



export default App;
