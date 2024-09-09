import React from "react";
import { Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Text
      fontSize="2xl"
      fontWeight="bold"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="20vh"
      color="red.500"
    >
      Design your header
    </Text>
  );
}
