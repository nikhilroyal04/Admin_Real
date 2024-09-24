import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../../app/Slices/menuSlice'; 
import propertyReducer from '../Slices/propertiesSlice';


const store = configureStore({
  reducer: {
    menu: menuReducer,
    property: propertyReducer,
  },
});

export default store;
