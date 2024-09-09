import React from "react";
import { Routes, Route } from "react-router-dom";
import FullLayout from "../layouts/FullLayouts";
import Login from "../components/Login/Login";
import { AnimatePresence } from "framer-motion";
import Dashboard from "../components/Dashboard/Dashboard";
import Not_Found from "../components/Not_Found/Not_Found";
import User_List from "../components/Users/User_List";

const Routing = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />

        {/* Main Layout Routes */}
        <Route path="/" element={<FullLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<User_List />} />
        </Route>
        <Route path="*" element={<Not_Found />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Routing;
