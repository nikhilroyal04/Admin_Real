import { Box, Text, CloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMenuItems, toggleItem } from "../../app/Slices/menuSlice";




const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  // Select active menu items from the Redux store
  const menuItems = useSelector(selectMenuItems);
  const dispatch = useDispatch();

  // Function to handle item click
  const handleItemClick = (itemKey) => {
    setActiveItem(itemKey);
    dispatch(toggleItem(itemKey)); // Dispatch toggle action
    onClose(); // Close sidebar when an item is clicked
  };

  // Convert the menuItems object to an array
  const menuArray = Object.values(menuItems);

  return (
    <Box
      as="nav"
      position="fixed"
      left="0"
      width={{ base: "xs", md: "250px" }}
      height="100vh"
      bg="black"
      color="white"
      display={isOpen ? "block" : { base: "none", md: "block" }}
      zIndex="1000"
    >
      <CloseButton
        position="absolute"
        display={{ base: "flex", md: "none" }}
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

      {menuArray.map(item => (
        <Text
          key={item.key}
          mb={6}
          mt={6}
          pl={10}
          fontWeight={activeItem === item.key ? "bold" : "normal"}
          color={activeItem === item.key ? "blue.400" : "white"}
          cursor="pointer"
          onClick={() => handleItemClick(item.key)}
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


