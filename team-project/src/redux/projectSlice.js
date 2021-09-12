import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";

const KEY = "projects";

export const fetchProjects = createAsyncThunk(
  `${KEY}/fetchProjects`,
  async () => {
    try {
      const project = await axios.get("/projects");
      return project.data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchProjectById = createAsyncThunk(
  `${KEY}/fetchProjectById`,
  async (id) => {
    try {
      const rs = await axios.get(`/projects/${id}`, {
        headers: { Authorization: Cookie.get("access_token") },
      });
      if (rs.status === 200) return rs.data;
    } catch (error) {
      return error;
    }
  }
);
export const addProject = createAsyncThunk(
  `${KEY}/addProject`,
  async (data) => {
    try {
      const rs = await axios.post("/projects", data, {
        headers: { Authorization: Cookie.get("access_token") },
      });
      if (rs.status === 200) return data;
    } catch (error) {
      return error;
    }
  }
);
export const updateProject = createAsyncThunk(
  `${KEY}/updateProject`,
  async (data) => {
    try {
      const rs = await axios.put(`/projects/${data.project_ID}`, data, {
        headers: { Authorization: Cookie.get("access_token") },
      });
      if (rs.status === 200) return data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteProject = createAsyncThunk(
  `${KEY}/deleteProject`,
  async (id) => {
    try {
      const rs = await axios.delete(`/projects/${id}`, {
        headers: { Authorization: Cookie.get("access_token") },
      });
      if (rs.status === 200) return id;
    } catch (error) {
      return error;
    }
  }
);

const projectsSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    projects: [],
    project: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [fetchProjects.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;
      state.isLoading = false;
    },
    [fetchProjects.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [fetchProjectById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchProjectById.fulfilled]: (state, action) => {
      state.project = action.payload;
      state.isLoading = false;
    },
    [fetchProjectById.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [addProject.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addProject.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data) state.projects = [...state.projects, data];
      state.isLoading = false;
    },
    [addProject.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [updateProject.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateProject.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data) {
        const newProjects = state.projects.filter(
          (project) => project.project_ID !== parseInt(data.project_ID)
        );
        state.projects = [...newProjects, data];
      }
      state.isLoading = false;
    },
    [updateProject.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [deleteProject.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteProject.fulfilled]: (state, action) => {
      const id = action.payload;
      if (id) {
        const newProject = state.projects;
        state.projects = newProject.filter(
          (project) => project.project_ID !== id
        );
      }
      state.isLoading = false;
    },
    [deleteProject.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
const { reducer, actions } = projectsSlice;
export const { setLoading } = actions;
export default reducer;
