import React from "react";
import { Text } from "@chakra-ui/react";

export default function Dashboard() {
  return (
    <Text
      fontSize="2xl"
      fontWeight="bold"
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="60vh"
      color="blue.500"
    >
      Welcome to the dashboard
    </Text>
  );
}
