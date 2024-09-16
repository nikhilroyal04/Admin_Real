import { Box, Text, IconButton, Avatar, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { HamburgerIcon, BellIcon, MoonIcon, SearchIcon } from "@chakra-ui/icons";

const Header = ({ onOpen, isMenuOpen, onToggleTheme }) => {
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
      <Text fontSize="2xl" color="black" flex="1">
        Dashboard
      </Text>

      <Box display="flex" alignItems="center" ml="auto">
        <Box display="flex" alignItems="center" mr={4}>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon color="black" mb={2} />
            </InputLeftElement>
            <Input
              textColor='black'
              size='sm'
              variant='outline'
              width={{ base: "auto", md: "200px", ml:"3" }}
              mr={1}
              borderColor='#A0AEC0'
              borderRadius='full'
              bg='#EDF2F7'
              placeholder="search....."
              colorScheme="black"
            />
            
          </InputGroup>
        </Box>

        <IconButton
          icon={<HamburgerIcon />}
          display={{ base: "inline-flex", md: "none" }}
          onClick={onOpen}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-controls="menu"
          mr={4}
        />
        <Icon as={BellIcon} w={6} h={6} color="black" mr={4} aria-label="Notifications" />
        <Icon
          as={MoonIcon}
          w={6}
          h={6}
          color="black"
          mr={4}
          aria-label="Toggle dark mode"
          onClick={onToggleTheme}
        />
        <Avatar
          src='https://bit.ly/sage-adebayo'
          size='md'
          aria-label="User profile"
        />
      </Box>
    </Box>
  );
};

export default Header;
