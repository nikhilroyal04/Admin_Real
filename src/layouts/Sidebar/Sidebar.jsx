import React from 'react';
import { Box, Text, Divider } from '@chakra-ui/react';

function Sidebar() {
  return (
    <Box
      as="aside"
      position="fixed" 
      left="0"
      top="0"
      width="300px"
      height="100vh"
      bg="white"
      color="black"
      p="4"
      borderRightWidth="1px"
      borderRightColor="gray.200"
      zIndex="1"
      display={{ base: "none", md: "block" }} 
    >
     <Box borderBottomWidth="1px" borderBottomColor="gray.200" >
        <Text fontSize="35" fontWeight="bold" mb={8}>
          Admin Panel
        </Text>
      </Box>
      <Divider />
      <Box mt="4">
        <Text>Dashboard</Text>
        <Text>Users</Text>
        <Text>Settings</Text>
        <Text>Reports</Text>
      </Box>
    </Box>
  );
}

export default Sidebar;
