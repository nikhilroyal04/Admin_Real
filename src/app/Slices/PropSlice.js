// src/features/propertiesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  properties: [
    { id: 1, name: 'Alice',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25000',avatar: 'https://bit.ly/broken-link' },
    { id: 2, name: 'Sarita',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25001',avatar: 'https://bit.ly/broken-link' },
    { id: 3, name: 'Nargish',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25002',avatar: 'https://bit.ly/broken-link' },
    { id: 4, name: 'Shubhum',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25040',avatar: 'https://bit.ly/broken-link' },
    { id: 5, name: 'Nikhil',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25050',avatar: 'https://bit.ly/broken-link' },
    { id: 6, name: 'Tannu',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25700',avatar: 'https://bit.ly/broken-link' },
    { id: 7, name: 'Shalu',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25500',avatar: 'https://bit.ly/broken-link' },
    { id: 8, name: 'Sagar',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25090',avatar: 'https://bit.ly/broken-link' },
    { id: 9, name: 'Mitansh',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25040',avatar: 'https://bit.ly/broken-link' },
    { id: 10, name: 'Bala',assignedto: 'alice@example.com',mobileno:'9352678930', status: 'Active',wallet:'25700',avatar: 'https://bit.ly/broken-link' },
 ],
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // You can add reducers here if you need to modify state
  },
});

export const selectProperties = (state) => state.properties.properties;
export default propertiesSlice.reducer;
