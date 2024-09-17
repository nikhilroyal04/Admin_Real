import { Box, Drawer, DrawerContent, DrawerOverlay, DrawerHeader, IconButton, useDisclosure, Text, Divider } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { MdDashboard } from "react-icons/md"; // Import the Dashboard icon
import { IoMdLogIn } from "react-icons/io";
import { PiUserListFill } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";




const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Function to handle item click
  const handleItemClick = (item) => {
    setActiveItem(item);
    // Handle navigation or other actions here
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <Box
        as="nav"
        position="fixed"
        left="0"
        width={{ base: "full", md: "250px" }}
        height="100vh"
        bg="white"
        color="black"
        display={{ base: "none", md: "block" }}
      >
        <Box p={10} w="250px" borderRight="1px" borderColor="gray.200" h="100vh">
          {/* Drawer Header */}
          <Box borderBottomWidth="1px" borderColor="gray.200" pb={7} mb={8}>
            <Text fontSize="2xl" fontWeight="bold">
              Admin Panel
            </Text>
          </Box>

          {/* Sidebar Items */}
          <Text
            mb={4}
            fontWeight={activeItem === "Dashboard" ? "bold" : "normal"}
            color={activeItem === "Dashboard" ? "blue.500" : "black"}
            cursor="pointer"
            onClick={() => handleItemClick("Dashboard")}
            display="flex"
            alignItems="center"
          >
            <MdDashboard size={20} style={{ marginRight: 8 }} />
            Dashboard
          </Text>
          <Text
            mb={4}
            fontWeight={activeItem === "Login" ? "bold" : "normal"}
            color={activeItem === "Login" ? "blue.500" : "black"}
            cursor="pointer"
            onClick={() => handleItemClick("Login")}
            display="flex"
            alignItems="center"
          >
            <IoMdLogIn size={20} style={{ marginRight: 8 }} />
            Login
          </Text>
          <Text
            mb={4}
            fontWeight={activeItem === " UserList" ? "bold" : "normal"}
            color={activeItem === " UserList" ? "blue.500" : "black"}
            cursor="pointer"
            onClick={() => handleItemClick(" UserList")}
            display="flex"
            alignItems="center"
          >
            <PiUserListFill size={20} style={{ marginRight: 8 }} />
            UserList
          </Text>
          <Text
            mb={4}
            fontWeight={activeItem === "Settings" ? "bold" : "normal"}
            color={activeItem === "Settings" ? "blue.500" : "black"}
            cursor="pointer"
            onClick={() => handleItemClick("Settings")}
            display="flex"
            alignItems="center"
          >
            <IoSettingsOutline size={20} style={{ marginRight: 8 }} />
            Settings
          </Text>
          {/* Add more sidebar items here */}
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
