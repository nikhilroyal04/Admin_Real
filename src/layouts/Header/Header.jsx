import { Box, Flex, Heading,Stack,Input } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header" bg="teal.500" color="white" p={4}>
      <Flex align="center" justify="space-between">
        <Heading size="lg">Dashboard</Heading>
      </Flex>
    </Box>
  );
};

export default Header;
