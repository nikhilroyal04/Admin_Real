import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../../app/Slices/menuSlice'; 
import propertiesReducer from '../Slices/PropSlice';


const store = configureStore({
  reducer: {
    menu: menuReducer,
    properties: propertiesReducer,
  },
});

export default store;
