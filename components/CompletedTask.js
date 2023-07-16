import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import classes from "./Addtask.module.css"

function CompletedTask() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const response = await fetch('/api/addTodo');
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to fetch completed todos');
      }
      const data = await response.json();
      const completedTodos = data.filter((item) => !item.isCompleted);
      console.log('completedTodos', completedTodos);
      setTodos(completedTodos);
    } catch (error) {
      console.error(error);
    }
  }
  

  const visitHandler = () => {
    router.push('/');
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-4" style={{ marginTop: '80px' }}>
        <div className='text-center my-5 flex flex-col' >
        <h1 className={`text-2xl font-bold ${classes.animate}`} style={{ marginBottom: '20px' }}>CompletedTask</h1>
        
        <ul className="w-100" style={{ width: "650px" }}>
        {todos &&
          todos.map((todo,index) => (
            <li
              key={index}
              className="flex items-center rounded shadow-xl ml-[200px] py-3 hover:bg-blue-100 hover:rounded-xl"
            >
                <span className='mt-3 mx-2'>
                {index +1}.
                </span>
                
              
              <span className="flex items-center mt-3 mx-2">
                {todo.addTodo}
              </span>

              
            </li>
          ))}
      </ul>
      </div>
      <button
        className={`bg-red-700 hover:bg-pink-600 text-white py-2 px-4 rounded mx-[200px] mt-8`}
        onClick={visitHandler}
      >
        Todos!
      </button>
      </div>
      
    </>
  );
}

export default CompletedTask;


