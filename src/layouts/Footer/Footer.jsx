import { Box, Text, Center } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" bg="teal.500" color="white" p={4} mt="auto">
      <Center>
        <Text>&copy; 2024 MyApp. All rights reserved.</Text>
      </Center>
    </Box>
  );
};

export default Footer;
