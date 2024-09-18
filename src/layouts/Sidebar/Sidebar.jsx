import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import DataItem from '../ArrayData/DataItem'; // Make sure this path is correct

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Function to handle item click
  const handleItemClick = (item) => {
    setActiveItem(item);
    // Handle navigation or other actions here
  };

  return (
    <Box
      as="nav"
      position="fixed"
      left="0"
      width={{ base: "full", md: "250px" }}
      height="100vh"
      bg="black"
      color="white"
      display={{ base: "none", md: "block" }}
    >
      <Box p={10} w="250px" borderRight="1px" borderColor="gray.200" h="100vh">
        <Box borderBottomWidth="1px" borderColor="gray.200" pb={7} mb={8}>
          <Text fontSize="2xl" fontWeight="bold">Admin Panel</Text>
        </Box>

        {DataItem.map((item) => (
          <Text
            key={item.key}
            mb={4}
            fontWeight={activeItem === item.name ? "bold" : "normal"}
            color={activeItem === item.name ? "blue.500" : "white"}
            cursor="pointer"
            onClick={() => handleItemClick(item.name)}
            display="flex"
            alignItems="center"
          >
            {item.icon}
            <span style={{ marginLeft: 8 }}>{item.name}</span>
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
