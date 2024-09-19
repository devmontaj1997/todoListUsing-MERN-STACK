import { configureStore } from '@reduxjs/toolkit';
import todoReducers from "../../feature/todoList/todoSlice.js"

export const store = configureStore({
  reducer: {
    todoList: todoReducers
  },
})