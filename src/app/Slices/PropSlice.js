// src/features/propertiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const propertiesPerPage = 10; // Define how many properties per page

// Asynchronous thunk to fetch properties from API with pagination
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async ({ page = 1 } = {}) => { // Accept page in an object to match pagination
    const response = await fetch(`https://api-real-estate02.vercel.app/v1/property/getAllProperties?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    const data = await response.json();
    return data; // Assuming it returns { properties, totalPages }
  }
);

const initialState = {
  properties: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    nextPage: (state) => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    previousPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.properties = action.payload.properties; // Adjust based on your API response structure
        state.totalPages = action.payload.totalPages; // Assuming the API returns total pages
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectCurrentPageProperties = (state) => {
  const start = (state.properties.currentPage - 1) * propertiesPerPage;
  return state.properties.properties.slice(start, start + propertiesPerPage);
};

export const selectCurrentPage = (state) => state.properties.currentPage;
export const selectTotalPages = (state) => state.properties.totalPages;

export const { nextPage, previousPage } = propertiesSlice.actions;

export default propertiesSlice.reducer;
