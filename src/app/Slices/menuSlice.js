import { createSlice } from "@reduxjs/toolkit";
import { RiDashboardLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { SlControlEnd } from "react-icons/sl";
import { FaBuilding } from "react-icons/fa";
import { SiGoogleadsense } from "react-icons/si";
import { MdContactPhone } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

const getIconComponentByName = (name) => {
  switch (name) {
    case "Roles":
      return SlControlEnd;
    case "Users":
      return FaUsers;
    case "Properties":
      return FaBuilding;
    case "Leads":
      return SiGoogleadsense;
    case "Contact":
      return MdContactPhone;
    default:
      return null;
  }
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
      icon: getIconComponentByName(item.module),
    }));

    // Adding fixed dashboard and signout items
    const dashboardItem = {
      title: "Dashboard",
      href: "/dashboard",
      icon: RiDashboardLine,
    };

    const signOutItem = {
      title: "Signout",
      href: "/logout",
      icon: BiLogOut,
    };

    dispatch(setLinkItems([dashboardItem, ...menuItems, signOutItem]));
  } catch (error) {
    console.error("Error fetching menu items:", error);
  }
};

export default menuSlice.reducer;
