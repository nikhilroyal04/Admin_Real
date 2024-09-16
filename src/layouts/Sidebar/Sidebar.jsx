import { Box, Drawer, DrawerContent, IconButton, useDisclosure, Text, Divider } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";


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
        <Box p={10}>
          {/* Sidebar content */}
          <Text fontSize="xl" fontWeight="bold" mb={10}>
            Admin Panel
          </Text>
          <Divider w="full" borderColor="gray.300"  />
        </Box>
        <Box p={10}>
        <Text
          mb={4}
          fontWeight={activeItem === "Dashboard" ? "bold" : "normal"}
          color={activeItem === "Dashboard" ? "blue.500" : "black"}
          cursor="pointer"
          onClick={() => handleItemClick("Dashboard")}
        >
          Dashboard
        </Text>
        <Text
          mb={4}
          fontWeight={activeItem === "Users" ? "bold" : "normal"}
          color={activeItem === "Users" ? "blue.500" : "black"}
          cursor="pointer"
          onClick={() => handleItemClick("Users")}
        >
          Users
        </Text>
        <Text
          mb={4}
          fontWeight={activeItem === "Settings" ? "bold" : "normal"}
          color={activeItem === "Settings" ? "blue.500" : "black"}
          cursor="pointer"
          onClick={() => handleItemClick("Settings")}
        >
          Settings
        </Text>
        {/* Add more sidebar items here */}
      </Box>
      </Box>
      {/* <Divider/> */}
      {/* Drawer for small screens */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerContent>
          <Box p={4} bg="gray.800" color="white" height="100vh" position="relative">
            {/* Close Button at the top right corner */}
            <IconButton
              icon={<CloseIcon />}
              position="absolute"
              top="10px"
              right="10px"
              onClick={onClose}
              aria-label="Close menu"
              bg="transparent"
              color="white"
              _hover={{ bg: "gray.700" }}
            />
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
