import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAllTodoApiSlice,
  deleteTodoApiSlice,
  filterByAorCTodoApiSlice,
  GetTodoApiSlice,
  todoApiSlice,
  updateTodoApiSlice,
} from "./todoApiSlice";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoLists: [],
    error: null,
    message: null,
    todoCount : null,
    loading: false,
  },
  reducers: {
    setMessageEmty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // this create todo list
      .addCase(todoApiSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(todoApiSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.todoLists = [...state.todoLists, action.payload.createTodo];
        state.todoCount =  action.payload.todoCount;
        state.message = action.payload.message;
      })
      .addCase(todoApiSlice.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
      })
      // this is Get todo list
      .addCase(GetTodoApiSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetTodoApiSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.todoLists = action.payload.allTodo;
        state.todoCount = action.payload.todoCount;
        state.message = action.payload.message;
      })
      .addCase(GetTodoApiSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // this is filter todo list by active or complate
      .addCase(filterByAorCTodoApiSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(filterByAorCTodoApiSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.todoLists = action.payload.filteredTasks;
        state.todoCount = action.payload.todoCount;
        state.message = action.payload.message;
      })
      .addCase(filterByAorCTodoApiSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // this is delete todo list
      .addCase(deleteTodoApiSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodoApiSlice.fulfilled, (state, action) => {
        state.loading = false;

        state.todoLists = state.todoLists?.filter(
          (item) => item.id !== action.payload.deletedUser.id
        );
        state.todoCount =  action.payload.todoCount;
        state.message = action.payload.message;
      })
      .addCase(deleteTodoApiSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })       // this is deleteAll todo list
      .addCase(deleteAllTodoApiSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllTodoApiSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.todoLists  = [],
        state.todoCount =  action.payload.todoCount;
        state.message = action.payload.message;
      })
      .addCase(deleteAllTodoApiSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })// this is update todo list
      .addCase(updateTodoApiSlice.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateTodoApiSlice.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTodo = action.payload.updatedTask; 
        
        
        state.todoLists = state.todoLists.map((item) =>
          item.id === updatedTodo.id ? { ...item, ...updatedTodo } : item
        );
        state.todoCount =  action.payload.todoCount;
        state.message = action.payload.message;
      })
      .addCase(updateTodoApiSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// export selectors
export const todoSelectors = (state) => state.todoList;
// export reducers actions
export const { setMessageEmty } = todoSlice.actions;
// export Reducer
export default todoSlice.reducer;
