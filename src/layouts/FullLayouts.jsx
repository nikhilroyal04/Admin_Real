import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

const FullLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {/* Pass onOpen to Header to trigger the sidebar on small screens */}
      <Header onOpen={onOpen} />

      {/* Pass isOpen and onClose to Sidebar to handle drawer opening/closing */}
      <Sidebar isOpen={isOpen} onClose={onClose} />

      <Box
        ml={{ base: 0, md: "250px" }}
        pt="60px"
        pb="60px"
        bg="gray.100"
        minHeight="100vh"
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default FullLayout;
