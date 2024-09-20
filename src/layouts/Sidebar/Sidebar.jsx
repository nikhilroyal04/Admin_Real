import React, { useEffect, useState } from "react";
import { Box, Text, CloseButton } from "@chakra-ui/react";
import { Link } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { fetchLinkItems } from "../../app/Slices/menuSlice";

const Sidebar = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLinkItems());
  }, [dispatch]);

  const handleItemClick = (title) => {
    setActiveItem(title);
    onClose();
  };

  const menuItems = useSelector((state) => state.menu.LinkItems);

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
      {/* Close button on mobile */}
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

      {/* Map over menu items from Redux store */}
      {menuItems.map((item, index) => (
        <Link to={item.href} key={index} style={{ textDecoration: "none" }}>
          <Text
            mb={6}
            mt={6}
            pl={10}
            cursor="pointer"
            display="flex"
            alignItems="center"
            _hover={{ color: "blue.300" }}
            onClick={() => handleItemClick(item.title)}
          >
            <Box as={item.icon} fontSize="20px" mr={4} />
            <span>{item.title}</span> 
          </Text>
        </Link>
      ))}
    </Box>
  );
};

export default Sidebar;
