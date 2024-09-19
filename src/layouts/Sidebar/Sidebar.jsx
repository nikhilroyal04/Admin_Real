import { Box, Text, CloseButton } from "@chakra-ui/react";
import { useState } from "react";
import DataItem from "../ArrayData/DataItem"; // Ensure this path is correct

const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Function to handle item click
  const handleItemClick = (item) => {
    setActiveItem(item);
    onClose(); // Close sidebar when an item is clicked
    // Handle navigation or other actions here
  };

  return (
    <Box
      as="nav"
      position="fixed"
      left="0"
      width={{ base: "xs", md: "250px" }}
      height="100vh"
      bg="black"
      color="white"
      display={isOpen ? "block" : { base: "none", md: "block" }} // Show on mobile if open
      zIndex="1000"
    >
      {/* Close Button Positioned in the Top-Right Corner */}
      <CloseButton
        position="absolute"
        display={{base: "flex", md: "none"}}
        top="10px"
        right="10px"
        fontSize={15}
        onClick={onClose}
      />

      <Box borderBottomWidth="1px" borderColor="gray.700" pb={7} mt={10}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mt={2}>
          Admin Panel
        </Text>
      </Box>

      {DataItem.map((item) => (
        <Text
          key={item.key}
          mb={6}
          mt={6}
          pl={10}
          fontWeight={activeItem === item.name ? "bold" : "normal"}
          color={activeItem === item.name ? "blue.400" : "white"}
          cursor="pointer"
          onClick={() => handleItemClick(item.name)}
          display="flex"
          alignItems="center"
          _hover={{ color: "blue.300" }} // Hover effect
        >
          {item.icon}
          <span style={{ marginLeft: 8 }}>{item.name}</span>
        </Text>
      ))}
    </Box>
  );
};

export default Sidebar;
