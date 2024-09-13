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
        {/* Footer links */}
        <HStack spacing={6}>
          <Link href="#about" _hover={{ textDecoration: "underline", color: "teal.400" }}>
            About Us
          </Link>
          <Link href="#contact" _hover={{ textDecoration: "underline", color: "teal.400" }}>
            Contact
          </Link>
          <Link href="#privacy" _hover={{ textDecoration: "underline", color: "teal.400" }}>
            Privacy Policy
          </Link>
        </HStack>

        {/* Social media icons */}
        <HStack spacing={4}>
          <Link href="https://facebook.com" isExternal>
            <Icon as={FaFacebook} boxSize={6} _hover={{ color: "teal.400" }} />
          </Link>
          <Link href="https://twitter.com" isExternal>
            <Icon as={FaTwitter} boxSize={6} _hover={{ color: "teal.400" }} />
          </Link>
          <Link href="https://instagram.com" isExternal>
            <Icon as={FaInstagram} boxSize={6} _hover={{ color: "teal.400" }} />
          </Link>
        </HStack>

        {/* Copyright text */}
        <Text fontSize="md" color="gray.400">
          © 2024 Admin Panel. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
