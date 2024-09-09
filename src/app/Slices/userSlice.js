import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setuserData: (state, action) => {
      state.data = action.payload.users;
      state.isLoading = false;
      state.error = null;
    },
    setuserLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setuserError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setuserData, setuserLoading, setuserError } = userlice.actions;

export const fetchuserData = () => async (dispatch) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "user/allUsers"
    );
    dispatch(setuserData(response.data.data));
  } catch (error) {
    dispatch(setuserError(error.message));
  }
};

export const selectuserData = (state) => state.user.data;
export const selectuserLoading = (state) => state.user.isLoading;
export const selectuserError = (state) => state.user.error;

export default userlice.reducer;
