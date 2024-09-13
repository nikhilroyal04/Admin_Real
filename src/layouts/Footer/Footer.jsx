import { Box, Text, Center } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box 
      as="footer" 
      bg="white" 
      color="black" 
      p={5}
      border="1px"         
      borderColor="gray.200" 
    >
      <Center>
        <Text>&copy; 2024 MyApp. All rights reserved.</Text>
      </Center>
    </Box>
  );
};

export default Footer;
