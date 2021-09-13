import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";
const KEY = "chat";
export const addMessage = createAsyncThunk(
  `${KEY}/addMessage`,
  async (data) => {
    try {
      const rs = await axios.post(`/messages/${data.project_ID}`, data, {
        headers: { Authorization: Cookie.get("access_token") },
      });
      if (rs.status === 200) {
        return data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const fetchMessages = createAsyncThunk(
  `${KEY}/fetchMessages`,
  async (id) => {
    const rs = await axios.get(`/messages/${id}`, {
      headers: { Authorization: Cookie.get("access_token") },
    });
    if (rs.status === 200) return rs.data;
  }
);
export const chatSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    messages: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [fetchMessages.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.messages = action.payload;
      state.isLoading = false;
    },
    [fetchMessages.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [addMessage.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addMessage.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data) state.messages = [...state.messages, data];
      state.isLoading = false;
    },
    [addMessage.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
const { reducer, actions } = chatSlice;
export const { setLoading } = actions;
export default reducer;
