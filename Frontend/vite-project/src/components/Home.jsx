import React,{ useEffect, useState } from 'react';
import axios from 'axios';

function Home() {

  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo]=  useState("")

  useEffect(()=>{
    const fetchtodos=async()=>{
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:4001/todo/fetch",{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json"
          }
        })
        console.log(response.data);
        setTodos(response.data)
        setError(null)
      } catch (error) {
        setError("Failed to fetch todos")
      }finally{
        setLoading(false)
      }
    }
    fetchtodos();
  },[]);

  const todoCreate = async()=>{
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "http://localhost:4001/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.newTodo);
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:4001/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to find todo status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to Delete Todo");
    }
  };

  return (
  <div className='text-amber-200 bg-gray-700 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6'>
    <h1 className='text-2xl font-semibold text-center'>Todo App</h1>
    <div className='flex mb-4'>
      <input type="text" placeholder='Add a new todo' className='flex-grow p-2 border rounded-l-md focus:outline-none' />
      <button className='bg-yellow-400 border rounded-r-md text-white px-4 py-2 hover:bg-blue-800 duration-300'>Add</button>
    </div>
    <ul className='space-y-2'>
     {todos.map((todo,index)=>{
       <li className='flex items-center justify-center p-3 bg-gray-600 rounded-md'>
       <div className='flex items-center'>
         <input type="checkbox" className='mr-2 ' />
         <span className='text-gray-200'>{todo.text}</span>
       </div>
       <button className='text-red-600 hover:text-red-700 duration-300'>delete</button>
     </li>
     })}
    </ul>
    <p className='mt-4 text-center text-sm '>0 Todo Remaining</p>
    <button className='mt-6 px-4 py-2 bg-red-600 hover:bg-amber-400 mx-auto block'>logout</button>
  </div> 
  )
}

export default Home