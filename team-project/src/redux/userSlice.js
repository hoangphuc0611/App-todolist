import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookie from "js-cookie";

const KEY = "user";

export const userLogin = createAsyncThunk(`${KEY}/userLogin`, async (user) => {
  try {
    const rs = await axios.post(`/login`, user);
    if (rs.status === 200) {
      const accessToken = rs.data?.accessToken;
      const user = rs.data?.response[0];
      Cookie.set("access_token", accessToken);
      Cookie.set("userInfo", JSON.stringify(user));
      const data = { accessToken, user };
      return data;
    }
  } catch (error) {
    return error;
  }
});
export const userSignUp = createAsyncThunk(
  `${KEY}/userSignUp`,
  async (user) => {
    try {
      const rs = await axios.post(`/accs`, user);
      if (rs.status === 200) {
        return rs.data;
      }
    } catch (error) {
      return error;
    }
  }
);
export const userLogOut = createAsyncThunk(`${KEY}/userLogOut`, async () => {
  try {
    Cookie.remove("access_token");
    Cookie.remove("userInfo");
  } catch (error) {
    return error;
  }
});
const userSlice = createSlice({
  name: KEY,
  initialState: {
    isLoading: false,
    isError: false,
    user: Cookie.getJSON("userInfo") || {},
    accessToken: "",
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userLogin.fulfilled]: (state, action) => {
      if (action.payload.user) {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isError = false;
      } else {
        state.isError = true;
      }
      state.isLoading = false;
    },
    [userLogin.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [userSignUp.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userSignUp.fulfilled]: (state, action) => {
      const data = action.payload;
      if (data.username) state.isError = false;
      else state.isError = true;
      state.isLoading = false;
    },
    [userSignUp.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [userLogOut.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userLogOut.fulfilled]: (state, action) => {
      state.user = {};
      state.accessToken = "";
      state.isLoading = false;
    },
    [userLogOut.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
const { reducer, actions } = userSlice;
export const { setLoading } = actions;
export default reducer;
