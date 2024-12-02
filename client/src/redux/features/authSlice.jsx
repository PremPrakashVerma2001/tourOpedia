import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.jsx";

export const loginAction = createAsyncThunk(
  "auth/login",
  async ({ form, navigate, toast }) => {
    try {
      const data = await api.login(form);
      const { message, success } = data;

      //   console.log(message);

      if (success === "true") {
        toast.success(message);
        navigate("/");
        return data;
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong!🤧");
    }
  }
);

export const signupAction = createAsyncThunk(
  "auth/signup",
  async ({ form, navigate, toast }) => {
    try {
      const data = await api.signup(form);
      const { message, success } = data;
      console.log(data);

      if (success === "true") {
        toast.success(message);
        navigate("/");
      } else {
        toast.error(message);
      }
      return data;
    } catch (error) {
      console.log(err);
      toast.error("Something went Wrong!🤧");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  reducers: {
    //for persisting between different refresh:
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //logiactionTypes :
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    //signup action types:
    builder.addCase(signupAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signupAction.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(signupAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
  //this: format is not supported anymore!
  //   {
  //     [loginAction.pending]: (state, action) => {
  //       state.loading = true;
  //     },
  //     [loginAction.fulfilled]: (state, action) => {
  //       state.loading = false;
  //       localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
  //       state.user = action.payload;
  //     },
  //     [loginAction.rejected]: (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload.message;
  //     },
  //   },
});

//this line is not understandable by me :
export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
