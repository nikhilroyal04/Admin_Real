import { Box, Text, VStack } from "@chakra-ui/react";

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
      border="2px" // Add border thickness
      borderColor="gray.600" // Set border color
      borderStyle="solid" // Set border style
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
