import { Box, Text, IconButton, Avatar } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header = ({ onOpen, isMenuOpen }) => {
  return (
    <Box
      mt={6}
      borderRadius={18}
      as="header"
      width={{ base: "100%", md: "calc(100% - 250px)" }}
      ml={{ base: 0, md: "250px" }}
      height="80px"
      bg="rgba(135, 206, 250, 0.3)"
      p={4}
      display="flex"
      alignItems="center"
      position="fixed"
      top="0"
      zIndex="999"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Text fontSize="2xl" color="" flex="1">
        Dashboard
      </Text>

      <Box display="flex" alignItems="center" ml="auto">
        <IconButton
          icon={<HamburgerIcon />}
          display={{ base: "inline-flex", md: "none" }}
          onClick={onOpen}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="menu"
          mr={4}
        />
        <Avatar
          src='https://bit.ly/dan-abramov'
          size='md'
          aria-label="User profile"
        />
      </Box>
    </Box>
  );
};

export default Header;
