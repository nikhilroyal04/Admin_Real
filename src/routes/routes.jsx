import React from "react";
import { Routes, Route } from "react-router-dom";
import FullLayout from "../layouts/FullLayouts";
import Dashboard from "../components/Dashboard/Dashboard";
import Roles from "../components/Roles/Roles";
import Users from "../components/Users/UserList";
import Properties from "../components/Properties/Properties";
import Leads from "../components/Leads/Leads";
import Contact from "../components/Contact/Contact";
import Login from "../components/Login/Login";
import { AnimatePresence } from "framer-motion";
import Not_Found from "../components/Not_Found/Not_Found";
import Logout from "../components/Login/Logout";

const Routing = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Main Layout Routes */}
        <Route path="/" element={<FullLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/users" element={<Users />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        <Route path="*" element={<Not_Found />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Routing;
