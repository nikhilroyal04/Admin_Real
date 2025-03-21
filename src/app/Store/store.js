import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../../app/Slices/menuSlice'; 
import propertyReducer from '../Slices/propertiesSlice';
import useReducer from '../Slices/userSlice';


const store = configureStore({
  reducer: {
    menu: menuReducer,
    property: propertyReducer,
    user: useReducer,
  },
});

export default store;
