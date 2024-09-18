import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const FullLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Header onOpen={onOpen} />

      <Sidebar isOpen={isOpen} onClose={onClose} />

      <Box
        ml={{ base: 0, md: "250px" }}
        pt="60px"
        pb="60px"
        bg="#0d0c0d" // Main content background
        color="white" // Main content text color
        minHeight="100vh"
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default FullLayout;
