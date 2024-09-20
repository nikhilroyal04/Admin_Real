// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../Slices/menuSlice';

const store = configureStore({
  reducer: {
    users: menuReducer,
    name: 'Users'
  },
});

export default store;
