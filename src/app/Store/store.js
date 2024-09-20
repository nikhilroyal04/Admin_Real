import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../../app/Slices/menuSlice'; // Adjust the path accordingly

const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

export default store;
