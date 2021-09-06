import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const KEY = "tasks";

export const fetchTasksByProjectId = createAsyncThunk(
  `${KEY}/fetchTasksByProjectId`,
  async (id) => {
    try {
      const tasks = await axios.get(`/tasks/${id}`);
      return tasks.data;
    } catch (error) {
      return error;
    }
  }
);
export const addTasksByProjectId = createAsyncThunk(
  `${KEY}/addTasksByProjectId`,
  async (data) => {
    try {
      const rs = await axios.post(`/tasks/${data.project_ID}`, data);
      if (rs.status === 200) {
        if (rs.data?.length > 0) return rs.data[0];
      }
    } catch (error) {
      return error;
    }
  }
);
export const updateTaskId = createAsyncThunk(
  `${KEY}/updateTaskId`,
  async (task) => {
    try {
      const rs = await axios.put(
        `/tasks/${task.project_ID}/${task.task_ID}`,
        task
      );
      if (rs.status === 200) return task;
    } catch (error) {
      return error;
    }
  }
);
export const deleteTask = createAsyncThunk(
  `${KEY}/deleteTask`,
  async (task) => {
    try {
      const rs = await axios.delete(
        `/tasks/${task.project_ID}/${task.task_ID}`
      );
      if (rs.status === 200) return task.task_ID;
    } catch (error) {
      return error;
    }
  }
);

const tasksSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    tasks: [],
    task: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [fetchTasksByProjectId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchTasksByProjectId.fulfilled]: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
    },
    [fetchTasksByProjectId.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [addTasksByProjectId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addTasksByProjectId.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data) state.tasks = [...state.tasks, data];
      state.isLoading = false;
    },
    [addTasksByProjectId.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateTaskId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateTaskId.fulfilled]: (state, action) => {
      const data = action.payload;
      const newTasks = state.tasks.filter(
        (task) => task.task_ID !== parseInt(data.task_ID)
      );
      state.tasks = [...newTasks, data];
      state.isLoading = false;
    },
    [updateTaskId.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteTask.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteTask.fulfilled]: (state, action) => {
      const id = action.payload;
      const newTasks = state.tasks.filter(
        (task) => task.task_ID !== parseInt(id)
      );
      state.tasks = newTasks;
      state.isLoading = false;
    },
    [deleteTask.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
const { reducer, actions } = tasksSlice;
export const { setLoading } = actions;
export default reducer;
