import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import classes from "./Addtask.module.css"

function AddTask(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [addTodo, setAddTodo] = useState("");


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const addTaskHandler = (e) => {
    setAddTodo(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const obj = {
      addTodo: addTodo,
    };
    console.log(obj);
    props.onAddTodo(obj)
    setAddTodo("");
  };

  return (
    <>
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
    </>
  );
}

export default AddTask;
