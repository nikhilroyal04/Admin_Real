import { MdDashboard } from "react-icons/md";
import { FaCriticalRole } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { SiFusionauth } from "react-icons/si";
import { LuTableProperties } from "react-icons/lu";
import { SiGoogleadsense } from "react-icons/si";
import { MdContactPhone } from "react-icons/md";

const DataItem = [
  { name: "Dashboard", icon: <MdDashboard size={20} />, key: "Dashboard", active: true },
  { name: "Roles", icon: <FaCriticalRole size={20} />, key: "Roles", active: true },
  { name: "Users", icon: <FaUsersLine size={20} />, key: "UserList", active: true },
  { name: "Auth", icon: <SiFusionauth size={20} />, key: "Auth", active: true },
  { name: "Properties", icon: <LuTableProperties size={20} />, key: "Properties", active: true },
  { name: "Leads", icon: <SiGoogleadsense size={20} />, key: "Leads", active: true },
  { name: "Contact", icon: <MdContactPhone size={20} />, key: "Contact", active: true },
];

export default DataItem;
