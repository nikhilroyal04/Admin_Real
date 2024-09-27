import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    propertyByPropertyNo: null,
    propertyStatus: null, // Added property status data
  },
  reducers: {
    setPropertyData: (state, action) => {
      state.data = action.payload.properties;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.isLoading = false;
      state.error = null;
    },
    setPropertyLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setPropertyError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPropertyByPropertyNo: (state, action) => {
      state.propertyByPropertyNo = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setPropertyByPropertyNoError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPropertyStatus: (state, action) => {
      state.propertyStatus = action.payload; // Update property status
      state.isLoading = false;
      state.error = null;
    },
    clearPropertyStatus: (state) => {
      state.propertyStatus = null; // Clear property status
    },
  },
});

// Action creators
export const {
  setPropertyData,
  setPropertyLoading,
  setPropertyError,
  setPropertyByPropertyNo,
  setPropertyByPropertyNoError,
  setPropertyStatus,
  clearPropertyStatus,
} = propertySlice.actions;

// Async thunk to toggle property status
export const togglePropertyStatus = (status, propertyNo) => async (dispatch) => {
  dispatch(setPropertyLoading());
  try {
    const requestBody = { status }; // Prepare the request body

    await axios.put(
      `http://localhost:3310/v1/property/removeProperty/${propertyNo}`, 
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(fetchAllPropertyData()); // Fetch updated property data
    dispatch(setPropertyStatus(status)); // Update property status in the store
  } catch (error) {
    dispatch(setPropertyError(error.message)); // Handle any errors
  }
};

// Async thunk to fetch all property data
export const fetchAllPropertyData = (page = 1, searchQuery = '', propertyFor = '', propertyType = '', propertySubtype = '', size = '', subLocation = '') => async (dispatch) => {
  dispatch(setPropertyLoading());

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}property/getAllProperties`,
      {
        params: {
          page,
          limit: 20,
          propertyNo: searchQuery,
          propertyFor,
          propertyType,
          propertySubtype,
          size,
          location: searchQuery,
          subLocation,
        },
      }
    );

    const { properties, totalPages } = response.data.data;

    dispatch(setPropertyData({
      properties,
      totalPages,
      currentPage: page,
    }));
  } catch (error) {
    dispatch(setPropertyError(error.message));
  }
};

// Async thunk to add a property
export const addPropertyData = (formData) => async (dispatch) => {
  dispatch(setPropertyLoading());
  try {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/property/addProperty`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(fetchAllPropertyData());
  } catch (error) {
    dispatch(setPropertyError(error.message));
  }
};

// Async thunk to edit a property
export const editPropertyData = (id,formData) => async (dispatch) => {
  dispatch(setPropertyLoading());
  try {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}property/updateProperty${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(fetchAllPropertyData());
  } catch (error) {
    dispatch(setPropertyError(error.message));
  }
};

// Async thunk to delete a property
// Adjust the import path as necessary

export const deleteProperty = (id) => async (dispatch) => {
  dispatch(setPropertyLoading());

  try {
    await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/property/removeProperty/${id}`
    );

    // Fetch updated property data after deletion
    dispatch(fetchAllPropertyData());
    
    // Optionally return a success message or the deleted ID
    return id; 
  } catch (error) {
    dispatch(setPropertyError(error.message));
    
    // Optionally throw the error for handling in the component
    throw new Error(error.message);
  }
};


// Async thunk to fetch property by property number
export const fetchPropertyByPropertyNo = (propertyNo) => async (dispatch) => {
  dispatch(setPropertyLoading());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}property/getProperty/${propertyNo}`
    );
    dispatch(setPropertyByPropertyNo(response.data.data));
  } catch (error) {
    dispatch(setPropertyByPropertyNoError(error.message));
  }
};

// Selectors
export const selectPropertyData = (state) => state.property.data;
export const selectPropertyLoading = (state) => state.property.isLoading;
export const selectPropertyError = (state) => state.property.error;
export const selectTotalPages = (state) => state.property.totalPages;
export const selectCurrentPage = (state) => state.property.currentPage;
export const selectPropertyByPropertyNo = (state) => state.property.propertyByPropertyNo;
export const selectPropertyStatus = (state) => state.property.propertyStatus; // Selector for property status

export default propertySlice.reducer;
