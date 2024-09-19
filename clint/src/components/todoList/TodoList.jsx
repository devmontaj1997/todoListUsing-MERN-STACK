import "./TodoList.css";
import { GiCrossedBones } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllTodoApiSlice,
  deleteTodoApiSlice,

  filterByAorCTodoApiSlice,

  GetTodoApiSlice,
  todoApiSlice,
  updateTodoApiSlice,
} from "../../feature/todoList/todoApiSlice";
import FormManageHooks from "../../hooks/formManageHooks/formManageHooks";
import { useEffect, useState } from "react";
import createTost from "../../utils/reactTostify";
import {
  setMessageEmty,
  todoSelectors,
} from "../../feature/todoList/todoSlice";

const TodoList = () => {
  // selector
  const { error, message, todoLists, loading, todoCount } =
    useSelector(todoSelectors);

  // dispatch
  const dispatch = useDispatch();

  const { input, handleInputChange, formReset } = FormManageHooks({
    task: "",
    taskOption: "",
  });

  // This is for get todo
  useEffect(() => {
    dispatch(GetTodoApiSlice());
  }, [dispatch]);

  // Toastify Notifications
  useEffect(() => {
    if (message) {
      createTost(message, "success");
      dispatch(setMessageEmty());
      formReset();
    }
    if (error) {
      createTost(error);
      dispatch(setMessageEmty());
    }
  }, [message, error, dispatch, formReset]);

  // Delete Todo
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodoApiSlice(id));
  };

  // State for Update Todo
  const [updateTodo, setUpdateTodo] = useState(null);

  const handleUpdateTodo = (item) => {
    setUpdateTodo(item);
  };

  // Handle Input Change for Update Mode
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;

    setUpdateTodo((prev) => ({
      ...prev,
      [name]: value, // Update the correct field based on the input's name
    }));
  };

  // Create and Update Todo
  const handleInputSubmit = (e) => {
    e.preventDefault();

    if (updateTodo) {
      dispatch(
        updateTodoApiSlice({
          id: updateTodo.id,
          task: updateTodo.task,
          taskOption: updateTodo.taskOption,
        })
      );
      setUpdateTodo(null); // Reset after update
    } else {
      dispatch(todoApiSlice(input));
    }
  };
  //  This is handleDeleteAll

  const handleDeleteAll = () => {
    dispatch(deleteAllTodoApiSlice());
  };
  // isactive

  const [activeFilter, setActiveFilter] = useState('All');
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === 'All') {
      dispatch(GetTodoApiSlice());
    } else {
      // Call your filter function here
      handlefilterByActive(filter);
    }
  };

  // This is for get todo
  useEffect(() => {
    //setIsActive(true);
    dispatch(GetTodoApiSlice());
  }, [dispatch]);

  // // handlefilter by active
  const handlefilterByActive = (filter) =>{
    dispatch(filterByAorCTodoApiSlice(filter))
    
   }


  return (
    <div className="mainDiv h-screen p-4">
      <div className="container">
        <div className="todoListArtea bg-[#25273c] rounded-lg shadow-xl md:w-[600px] m-auto">
          <div className="topArea border-b-2 mb-2">
            <li className="mb-2 p-3">
              <div className="grid ">
                <form action="" onSubmit={handleInputSubmit}>
                  <div>
                    <input
                      name="task"
                      value={updateTodo ? updateTodo.task : input.task}
                      onChange={
                        updateTodo ? handleUpdateInputChange : handleInputChange
                      }
                      type="text"
                      placeholder="Enter Your Task"
                      className="w-full border-2 text-xl p-2 rounded-lg text-white bg-transparent"
                    />
                  </div>

                  <div>
                    <select
                      value={
                        updateTodo ? updateTodo.taskOption : input.taskOption
                      }
                      onChange={
                        updateTodo ? handleUpdateInputChange : handleInputChange
                      }
                      name="taskOption"
                      className="w-full border-2 text-xl p-2 rounded-lg text-white bg-transparent my-3 "
                    >
                      <option value="" className="text-black ">
                        —Please choose an option—
                      </option>
                      <option value="Active" className="text-black ">
                        Active
                      </option>
                      <option value="Completed" className="text-black ">
                        Completed
                      </option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="text-white w-full text-xl border-2 p-2 rounded-lg"
                    >
                      {loading
                        ? updateTodo
                          ? "loading..."
                          : "loading..."
                        : updateTodo
                        ? "Update Task"
                        : "Add Task"}
                    </button>
                  </div>
                </form>
              </div>
            </li>
          </div>

          <div className="listArea pt-3 md:h-[330px] xxxsm:h-[200px] overflow-scroll overflow-x-hidden">
            {todoLists?.length > 0 ? (
              [...todoLists].reverse().map((item) => (
                <li
                  key={item.id}
                  className="mb-2 p-3 border-b-2 flex justify-between"
                >
                  <label className="checkbox-container text-white">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    {item.task}
                  </label>
                  <div>
                    <span className="text-white">{item.taskOption}</span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleUpdateTodo(item)}>
                      <CiEdit className="text-white text-3xl" />
                    </button>
                    <button onClick={() => handleDeleteTodo(item.id)}>
                      <GiCrossedBones className="text-white text-2xl" />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="mb-2 p-3 border-b-2 flex justify-between">
                <label className="checkbox-container text-white text-2xl">
                  Todo not found
                </label>
              </li>
            )}
          </div>
          <div className="listFooter">
            <li className="mb-2 py-3">
              <div className="text-white mx-2 text-xl grid sm:grid-cols-[25%_55%_20%]">
                <div className="leftBtn text-center">
                  <p>
                    (<span className="text-[#FF014F]">{todoCount}</span>)Items
                    Left
                  </p>
                </div>
                <div className="middleBtn flex gap-5 justify-center my-3 sm:my-0">
                  <button
                    className={activeFilter === 'All' ? "active px-2 rounded" : "px-2 rounded"}
                    onClick={() => handleFilterChange('All')}
                  >
                    All
                  </button>
                  <button className={activeFilter === 'Active' ? "active px-2 rounded" : "px-2 rounded"}
        onClick={() => handleFilterChange('Active')}>Active</button>
                  <button   className={activeFilter === 'Completed' ? "active px-2 rounded" : "px-2 rounded"}
        onClick={() => handleFilterChange('Completed')}>Completed</button>
                </div>
                <div className="rightBtn">
                  <button
                    className="text-center w-full"
                    onClick={handleDeleteAll}
                  >
                    Delete All
                  </button>
                </div>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
