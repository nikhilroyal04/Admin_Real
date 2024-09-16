import { Box, Text, HStack, VStack, Link, Icon } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      as="footer"
      width={{ base: "100%", md: "calc(100% - 250px)" }}
      ml={{ base: 0, md: "250px" }}
      height="auto"
      bg="black"
      p={4}
      color="white"
      position="fixed"
      bottom="0"
    >
      {/* Content container */}
      <VStack spacing={4} align="center">
       
        {/* Copyright text */}
        <Text fontSize="md" color="gray.400">
          © 2024 Admin Panel. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
