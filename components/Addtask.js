import { AiOutlinePlus } from "react-icons/ai";
import { useState,useEffect } from "react";
import classes from "./Addtask.module.css"
import { useRouter } from "next/router";

function AddTask(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [addTodo, setAddTodo] = useState("");
  const [todos, setTodos] = useState([])

  const router=useRouter()


  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    try {
      const response = await fetch('/api/addTodo') // Update the URL to '/api/addTodo' instead of '/api/fetchTodos'
      const data = await response.json()
      // console.log(data)
      setTodos(data) // Update to setTodos(data || []) instead of setTodos(data.todos || [])
        console.log("UI data",data)
    } catch (error) {
      console.error(error)
    }
  }


  function handleDeleteTodo(_id) {
    console.log("Id",_id)
    fetch(`/api/addTodo?id=${_id}`, {
      method: "DELETE",
    })
    
      .then((response) => {
        console.log("Response",response)
        if (response.ok) {
          console.log("Todo is deleted successfully");
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
        } else {
          throw new Error("Failed to delete todo");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleEditTodo = (_id) => {
    //Find the expense proper id
    const editItem=todos.find((todo)=> todo._id === _id)
    //populating the selected expense
    if(editItem){
      setAddTodo(editItem.todo)
      console.log("Selected todo item:", editItem);
      
  }
    // Handle the edit action for the specific todo
    fetch(`/api/addTodo?id=${_id}`, {
      method: "DELETE",
    })
    
      .then((response) => {
        console.log("Response",response)
        if (response.ok) {
          console.log("Todo is deleted successfully");
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== _id));
        } else {
          throw new Error("Failed to delete todo");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  
  }
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const addTaskHandler = (e) => {
    setAddTodo(e.target.value);
  };

 async function formSubmitHandler (e,refresh) {
    e.preventDefault();
    router.refresh
    const obj = {
      addTodo: addTodo,
    };
    console.log(obj);
    
    const response = await fetch('/api/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
  
    if (response.ok) {
      const data = await response.json();
      const newTodo = { id: data.id, text: obj };
      setTodos(prevTodos => [...prevTodos, obj]);
    }
    setAddTodo("");
  };

  return (
    <>
      <main className="max-w-4xl mx-auto mt-4" style={{ marginTop: '80px' }}>
        <div className="text-center my-5 flex flex-col">
          <h1 className={`text-2xl font-bold ${classes.animate}`} style={{ marginBottom: '20px' }}>
            TODO LIST APP
          </h1>
          <div className="flex items-center justify-center">
        <button
          className="rounded-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 flex items-center w-68 mx-5"
          style={{ width: "600px" }}
          onClick={handleOpenModal}
        >
          <span className="mx-auto text-lg">ADD NEW TASK</span>
          <AiOutlinePlus className="mx-" size={30} />
        </button>
      </div>
      <input
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
        checked={modalOpen}
        onChange={handleCloseModal}
      />
      {modalOpen && (
        <div className="modal">
          <div className="modal-box bg-gradient-to-r from-red-400 to-purple-500">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>
              ✕
            </button>
            <h3 className={`font-bold text-lg ${classes.animate}`}>ADD TODO!</h3>
            <form className="mt-4" onSubmit={formSubmitHandler}>
              <h3 className="text-lg font-bold mt-2 text-left mx-7">Add new task:</h3>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs mt-2"
                value={addTodo}
                onChange={addTaskHandler}
              />
              <button type="submit" className="btn mx-2 bg-gradient-to-r from-blue-600 to-blue-800">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
       </div>
    </main>
    <div className="flex justify-center mx-auto">
      <ul className="w-100" style={{ width: "650px" }}>
        {todos &&
          todos.map((todo,index) => (
            <li
              key={index}
              className="flex items-center rounded shadow-xl mx-5 py-3 hover:bg-blue-100 hover:rounded-xl"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(event) => handleCheckboxChange(event, todo)}
                className="mr-2 mx-2 mt-3"
              />
              <span className="flex items-center mt-3 mx-4">
                {todo.addTodo}
              </span>

              <div className="ml-auto flex items-center">

              <button
                className="bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded"
                
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
              <button
                className="bg-green-700 hover:bg-pink-600 text-white  py-2 px-4 rounded mx-1"
                onClick={() => handleEditTodo(todo._id)}
              >
                Edit
              </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
   </>
  );
}

export default AddTask;
