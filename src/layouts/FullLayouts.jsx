import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Sidebar from './Sidebar/Sidebar';
import { Box, Flex } from '@chakra-ui/react';

const FullLayout = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Flex flex="1" direction={{ base: 'column', md: 'row' }}>
        <Sidebar />
        <Box flex="1" ml={{ base: 0, md: '250px' }} p="4">
          <Outlet />
        </Box>
      </Flex>
      {/* Divider before the Footer */}
      <Box borderTop="2px" borderColor="gray.200" my="4" />
      <Footer />
    </Flex>
  );
};

export default FullLayout;
