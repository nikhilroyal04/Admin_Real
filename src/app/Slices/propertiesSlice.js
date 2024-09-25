import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    propertyByProperyNo: null,
  },
  reducers: {
    setpropertyData: (state, action) => {
      state.data = action.payload.properties;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.isLoading = false;
      state.error = null;
    },
    setpropertyLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setpropertyError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPropertyByProperyNo: (state, action) => {
      state.propertyByProperyNo = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setPropertyByProperyNoError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setpropertyData,
  setpropertyLoading,
  setpropertyError,
  setPropertyByProperyNo,
  setPropertyByProperyNoError,
} = propertySlice.actions;

export const fetchAllpropertyData = (page = 1, searchQuery = '',propertyFor = '', propertyType = '',propertySubtype ='', size = '',location = '', subLocation = '') => async (dispatch) => {
  dispatch(setpropertyLoading());

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}property/getAllProperties`,
      {
        params: {
          page,
          limit: 20,
          propertyNo: searchQuery,
          propertyFor,
          propertyType ,
          propertySubtype,
          size,
          location,
          subLocation,
         },
      }
    );

    const { properties, totalPages } = response.data.data;

    dispatch(setpropertyData({
      properties,
      totalPages,
      currentPage: page,
    }));
  } catch (error) {
    dispatch(setpropertyError(error.message));
  }
};

export const addPropertyData = (formData) => async (dispatch) => {
  try {
    await axios.post(
      import.meta.env.VITE_BASE_URL + "property/addProperty",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(fetchAllpropertyData());
  } catch (error) {
    console.error("Error:", error);
  }
};

// New edit property action
export const editPropertyData = (propertyNo, formData) => async (dispatch) => {
  dispatch(setpropertyLoading());
  try {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}property/editProperty/${propertyNo}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(fetchAllpropertyData()); // Refresh property list
  } catch (error) {
    dispatch(setpropertyError(error.message));
  }
};

// New delete property action
export const deleteProperty = (propertyNo) => async (dispatch) => {
  dispatch(setpropertyLoading());
  try {
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}property/deleteProperty/${propertyNo}`
    );

    dispatch(fetchAllpropertyData()); // Refresh property list
  } catch (error) {
    dispatch(setpropertyError(error.message));
  }
};

export const fetchPropertyByProperyNo = (propertyNo) => async (dispatch) => {
  dispatch(setpropertyLoading());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}property/getProperty/${propertyNo}`
    );
    dispatch(setPropertyByProperyNo(response.data.data));
  } catch (error) {
    dispatch(setPropertyByProperyNoError(error.message));
  }
};

export const selectpropertyData = (state) => state.property.data;
export const selectpropertyLoading = (state) => state.property.isLoading;
export const selectpropertyError = (state) => state.property.error;
export const selectTotalPages = (state) => state.property.totalPages;
export const selectCurrentPage = (state) => state.property.currentPage;
export const selectPropertyByProperyNo = (state) => state.property.propertyByProperyNo;

export default propertySlice.reducer;
