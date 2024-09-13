import { Box, Drawer, DrawerContent, IconButton, useDisclosure, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Sidebar for large screens */}
      <Box
        as="nav"
        position="fixed"
        left="0"
        width={{ base: "full", md: "250px" }}
        height="100vh"
        bg="gray.800"
        color="white"
        display={{ base: "none", md: "block" }}
      >
        <Box p={4}>
          {/* Sidebar content */}
          <Text>Dashboard</Text>
          <Text>Users</Text>
          {/* Add more sidebar items */}
        </Box>
      </Box>

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

            {/* Sidebar content */}
            <Box mt={10}> 
              <Text>Dashboard</Text>
              <Text>Users</Text>
              {/* Add more sidebar items */}
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
