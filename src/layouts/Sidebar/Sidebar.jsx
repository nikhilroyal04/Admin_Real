import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function Sidebar() {
  return (
    <Box display="flex">
      {/* Fixed Sidebar */}
      <Box
        as="aside"
        position="fixed"
        left="0"
        top="0"
        width="290px"
        height="100vh"
        bg="white"
        color="black"
        p="4"
        zIndex="1"
      >
        {/* Sidebar Header */}
        <Box  borderBottomWidth="1px" borderBottomColor="gray.200" >
          <Text fontSize="40px" fontWeight="bold">
           Admin Panel
          </Text>
        </Box>
        
      </Box>
    </Box>
  );
}

export default Sidebar;
