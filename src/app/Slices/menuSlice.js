import { createSlice } from "@reduxjs/toolkit";

const iconMap = {
  Roles: "SlControlEnd",
  Users: "FaUsers",
  Properties: "FaBuilding",
  Leads: "SiGoogleadsense",
  Contact: "MdContactPhone",
};

const initialState = {
  LinkItems: [],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setLinkItems: (state, action) => {
      state.LinkItems = action.payload || [];
    },
  },
});

export const { setLinkItems } = menuSlice.actions;

export const fetchLinkItems = () => async (dispatch) => {
  try {
    const menuItems = [
      { module: "Roles", pageRoute: "/roles" },
      { module: "Users", pageRoute: "/users" },
      { module: "Properties", pageRoute: "/properties" },
      { module: "Leads", pageRoute: "/leads" },
      { module: "Contact", pageRoute: "/contact" },
    ].map((item) => ({
      title: item.module,
      href: item.pageRoute,
      iconName: iconMap[item.module],
    }));

    dispatch(setLinkItems(menuItems));
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};

export default menuSlice.reducer;
