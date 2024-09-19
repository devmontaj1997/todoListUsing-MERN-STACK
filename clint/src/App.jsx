import Header from "./components/header/Header"
import TodoList from "./components/todoList/TodoList"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
 <>
 <Header/>
 <TodoList/>
 <ToastContainer
        position="top-center"
        style={{ zIndex: "99999999" }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
 
 </>
  )
}

export default App