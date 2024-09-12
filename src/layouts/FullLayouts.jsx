import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";
import Sidebar from "../layouts/Sidebar/Sidebar";

const FullLayout = () => {
 

  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex flex="1" direction={{ base: "column", md: "row" }}>
        <Box as="main" flex="1" p={4}>
          <Outlet />
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default FullLayout;
