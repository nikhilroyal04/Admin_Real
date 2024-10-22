import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    userById: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload.users;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.isLoading = false;
      state.error = null;
    },
    setUserLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUserError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUserById: (state, action) => {
      state.userById = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setUserByIdError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setUserData,
  setUserLoading,
  setUserError,
  setUserById,
  setUserByIdError,
} = userSlice.actions;

export const fetchAllUserData =
  (page = 1, searchQuery = "") =>
  async (dispatch) => {
    dispatch(setUserLoading());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}user/getAllUsers`,
        {
          params: {
            page,
            searchQuery,
          },
        }
      );
      const { users, totalPages } = response.data.data;
      dispatch(
        setUserData({
          users,
          totalPages,
          currentPage: page,
        })
      );
    } catch (error) {
      dispatch(setUserError(error.message));
    }
  };

export const addUserData = (formData) => async (dispatch) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}user/addUser`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(fetchAllUserData());
  } catch (error) {
    dispatch(setUserError(error.message));
  }
};

// Edit user action
export const editUserData = (id, formData) => async (dispatch) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}user/updateUser/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(fetchAllUserData());
  } catch (error) {
    dispatch(setUserError(error.message));
  }
};

// Delete user action
export const deleteUserData = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}user/removeUser/${id}`
    );
    dispatch(fetchAllUserData());
  } catch (error) {
    dispatch(setUserError(error.message));
  }
};

export const fetchUserById = (id) => async (dispatch) => {
  dispatch(setUserLoading());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}user/getUser/${id}`
    );
    dispatch(setUserById(response.data.data));
  } catch (error) {
    dispatch(setUserByIdError(error.message));
  }
};

// Selectors
export const selectUserData = (state) => state.user.data;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;
export const selectTotalPages = (state) => state.user.totalPages;
export const selectCurrentPage = (state) => state.user.currentPage;
export const selectUserById = (state) => state.user.userById;

export default userSlice.reducer;
