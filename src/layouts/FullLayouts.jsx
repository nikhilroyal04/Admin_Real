import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Box } from '@chakra-ui/react';

const FullLayout = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bg="white" 
      
    >
      <Header />
      <Box as="main" flex="1" p={4}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default FullLayout;
