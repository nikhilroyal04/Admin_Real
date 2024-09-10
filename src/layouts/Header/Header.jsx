// Header.js
import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';


const Header = () => {
  return (
    <Box as="header" bg="teal.500" color="white" padding="4">
      <Flex align="center" justify="space-between" maxW="1200px" mx="auto">
        <Heading>
          Dashboard
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;
