import { createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";
import API from "../../apiAxiosInstance/api";
// this is create todoApiSlice
export const todoApiSlice = createAsyncThunk(
  "todo/todoApiSlice",
  async (data) => {
    try {
      const response = await API.post("/add_task", data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is Get todoApiSlice
export const GetTodoApiSlice = createAsyncThunk(
  "todo/GetTodoApiSlice",
  async () => {
    try {
      const response = await API.get("/");

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is delete todoApiSlice
export const deleteTodoApiSlice = createAsyncThunk(
  "todo/deleteTodoApiSlice",
  async (id) => {
    try {
      const response = await API.delete(`delete_todo/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is deleteAll todoApiSlice
export const deleteAllTodoApiSlice = createAsyncThunk(
  "todo/deleteAllTodoApiSlice",
  async () => {
    try {
      const response = await API.delete(`delete_todo`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is upDate todoApiSlice
export const updateTodoApiSlice = createAsyncThunk(
  "todo/updateTodoApiSlice",
  async ({ id, task, taskOption }) => {
    console.log(taskOption);

    try {
      const response = await API.patch(`update_todo/${id}`, {
        task,
        taskOption,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// this is filter by active or complated todoApiSlice
export const filterByAorCTodoApiSlice = createAsyncThunk(
  "todo/filterByAorCTodoApiSlice",
  async (taskOption) => {
    try {
      const response = await API.get(`/${taskOption}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
