import { createSlice } from '@reduxjs/toolkit';
import { MdDashboard } from 'react-icons/md';
import { FaCriticalRole } from 'react-icons/fa';
import { FaUsersLine } from 'react-icons/fa6';
import { LuTableProperties } from 'react-icons/lu';
import { SiGoogleadsense } from 'react-icons/si';
import { MdContactPhone } from 'react-icons/md';

const initialState = {
  items: [
    { name: 'Dashboard', icon: MdDashboard , key: 'Dashboard', active: true },
    { name: 'Roles', icon: FaCriticalRole , key: 'Roles', active: true },
    { name: 'Users', icon: FaUsersLine , key: 'UserList', active: true },
    { name: 'Properties', icon: LuTableProperties , key: 'Properties', active: true },
    { name: 'Leads', icon: SiGoogleadsense , key: 'Leads', active: true },
    { name: 'Contact', icon: MdContactPhone  , key: 'Contact', active: true },
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

// src/features/menuSlice.js (or wherever your selectors are defined)

export const selectMenuItems = state => {
  const items = state.menu?.items || []; // Use optional chaining and fallback to an empty array
  return {
    dashboard: items.find(item => item.key === 'Dashboard') || {},
    roles: items.find(item => item.key === 'Roles') || {},
    userList: items.find(item => item.key === 'UserList') || {},
    properties: items.find(item => item.key === 'Properties') || {},
    leads: items.find(item => item.key === 'Leads') || {},
    contact: items.find(item => item.key === 'Contact') || {},
  };
};



export default menuSlice.reducer;
