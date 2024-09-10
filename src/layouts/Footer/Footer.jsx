import React from "react";
import { Box, Text, useBreakpointValue } from "@chakra-ui/react";

export default function Footer() {
  const fontSize = useBreakpointValue({ base: "lg", md: "xl", lg: "2xl" });

  return (
    <Box
      as="footer"
      bg="white"
      color="black"
      py={{ base: "4", md: "6", lg: "8" }}
      textAlign="center"
      bottom="0"
      width="100%"
    >
      <Text
       fontWeight="bold"
      >
        © 2024 Teppl... All rights reserved.
      </Text>
    </Box>
  );
}
