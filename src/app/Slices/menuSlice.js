import { createSlice } from '@reduxjs/toolkit';
import { MdDashboard } from 'react-icons/md';
import { FaCriticalRole } from 'react-icons/fa';
import { FaUsersLine } from 'react-icons/fa6';
import { LuTableProperties } from 'react-icons/lu';
import { SiGoogleadsense } from 'react-icons/si';
import { MdContactPhone } from 'react-icons/md';

const initialState = {
  items: [
    { name: 'Dashboard', icon: <MdDashboard size={20} />, key: 'Dashboard', active: true },
    { name: 'Roles', icon: <FaCriticalRole size={20} />, key: 'Roles', active: true },
    { name: 'Users', icon: <FaUsersLine size={20} />, key: 'UserList', active: true },
    { name: 'Properties', icon: <LuTableProperties size={20} />, key: 'Properties', active: true },
    { name: 'Leads', icon: <SiGoogleadsense size={20} />, key: 'Leads', active: true },
    { name: 'Contact', icon: <MdContactPhone size={20} />, key: 'Contact', active: true },
  ],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    toggleItem: (state, action) => {
      const item = state.items.find(i => i.key === action.payload);
      if (item) {
        item.active = !item.active;
      }
    },
  },
});

// Exporting the toggle action
export const { toggleItem } = menuSlice.actions;

// Selector to get the entire menu items
export const selectMenuItems = state => state.menu.items;

// Selector to get the Dashboard item specifically
export const selectDashboard = state => state.menu.items.find(item => item.key === 'Dashboard');
export const selectroles = state => state.menu.items.find(item => item.key === 'Roles');
export const selectuserList = state => state.menu.items.find(item => item.key === 'UserList');
export const selectproperties = state => state.menu.items.find(item => item.key === 'Properties');
export const selectleads = state => state.menu.items.find(item => item.key === 'Leadss');
export const selectcontact = state => state.menu.items.find(item => item.key === 'Contact');


export default menuSlice.reducer;
