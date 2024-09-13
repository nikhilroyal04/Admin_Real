import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

const Header = ({ onOpen }) => {
  return (
    <Box
      as="header"
      width={{ base: "100%", md: "calc(100% - 250px)" }} 
      ml={{ base: 0, md: "250px" }} 
      height="60px"
      bg="teal.500"
      p={4}
      display="flex"
      alignItems="center"
      position="fixed"
      top="0"
      zIndex="999"
    >
      {/* Hamburger Icon for small screens */}
      <IconButton
        icon={<HamburgerIcon />}
        display={{ base: "inline-flex", md: "none" }} 
        onClick={onOpen}
        aria-label="Open menu"
        mr={4} 
      />

      <Text fontSize="xl" color="white">
        Admin Panel
      </Text>
    </Box>
  );
};

export default Header;
