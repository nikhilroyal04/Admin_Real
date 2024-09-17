import React from "react";
import { Card, CardBody, Text, SimpleGrid, Icon, Box } from "@chakra-ui/react";
import { PiFolderOpenBold } from "react-icons/pi";
import { AiFillFile } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { FaUsersLine } from "react-icons/fa6";

export default function Dashboard() {
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacing={4}
        mt={14}
        p={2} // Adding padding to the SimpleGrid
      >
        {/* ******************************* Row - 1 *************************************** */}
        {/* ******************************* card-1 *************************************** */}
        <Card borderRadius="2xl" boxShadow="md" m={2} position="relative" bg="white">
          <CardBody>
            <Box position="absolute" top={5} right={8}>
              <Icon as={PiFolderOpenBold} boxSize={8} color="blue.500" />
            </Box>
            <Text fontSize="sm" color="gray.600">Today's Money</Text> {/* Gray text color */}
            <Text fontSize="xl" fontWeight="bold" color="gray.800">$53,897</Text> {/* Gray text color */}
            <Text mt={2} fontSize="sm" color="gray.600">
              <Text color="#48BB78" fontSize="sm">+3.48% </Text>Since last month.
            </Text> {/* Gray text color */}
          </CardBody>
        </Card>
        {/* ******************************* card-2 *************************************** */}
        <Card borderRadius="2xl" boxShadow="md" m={2} bg="white">
          <CardBody>
            <Box position="absolute" top={5} right={8}>
              <Icon as={FaUsersLine} boxSize={8} color="blue.500" />
            </Box>
            <Text fontSize="sm" color="gray.600">Today's Users</Text> {/* Gray text color */}
            <Text fontSize="xl" fontWeight="bold" color="gray.800">$3,200</Text> {/* Gray text color */}
            <Text mt={2} fontSize="sm" color="gray.600">
              <Text color="#48BB78" fontSize="sm">+5.2% </Text>Since last month.
            </Text> {/* Gray text color */}
          </CardBody>
        </Card>
        {/* ******************************* card-3 *************************************** */}
        <Card borderRadius="2xl" boxShadow="md" m={2} bg="white">
          <CardBody>
            <Box position="absolute" top={5} right={8}>
              <Icon as={AiFillFile} boxSize={8} color="blue.500" />
            </Box>
            <Text fontSize="sm" color="gray.600">New Clients</Text> {/* Gray text color */}
            <Text fontSize="xl" fontWeight="bold" color="gray.800">+2,850</Text> {/* Gray text color */}
            <Text mt={2} fontSize="sm" color="gray.600">
              <Text color="#F56565" fontSize="sm">-2.82% </Text> Since last month.
            </Text> {/* Gray text color */}
          </CardBody>
        </Card>
        {/* ******************************* card-4 *************************************** */}
        <Card borderRadius="2xl" boxShadow="md" m={2} bg="white">
          <CardBody>
            <Box position="absolute" top={5} right={8}>
              <Icon as={GiShoppingCart} boxSize={8} color="blue.500" />
            </Box>
            <Text fontSize="sm" color="gray.600">Total Sales</Text> {/* Gray text color */}
            <Text fontSize="xl" fontWeight="bold" color="gray.800">$173,000</Text> {/* Gray text color */}
            <Text mt={2} fontSize="sm" color="gray.600">
              <Text color="#48BB78" fontSize="sm">-8.12% </Text> Since last month.
            </Text> {/* Gray text color */}
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* ******************************* Row - 2 *************************************** */}
      <Box p={4}>
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      <Card borderRadius="md" boxShadow="sm" p={4} bg="white" w="full">
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
      <Card borderRadius="md" boxShadow="sm" p={4} bg="white" w="full">
        <CardBody>
          <Text>View sales performance and trends over the past month.</Text>
        </CardBody>
      </Card>
    </SimpleGrid>
  </Box>

       {/* ******************************* Row - 2 *************************************** */}
       <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Card borderRadius="md" boxShadow="sm" p={4} bg="white">
            <CardBody>
              <Text>View a summary of all your customers over the last month.</Text>
            </CardBody>
          </Card>
          <Card borderRadius="md" boxShadow="sm" p={4} bg="white">
            <CardBody>
              <Text>View sales performance and trends over the past month.</Text>
            </CardBody>
          </Card>
        </SimpleGrid>
      </Box>
    </>
  );
}
