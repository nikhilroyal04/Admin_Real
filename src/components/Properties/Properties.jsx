import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
  Flex,
  TableContainer,
  Avatar,
  Select,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  fetchAllpropertyData,
  selectpropertyData,
  selectTotalPages,
  selectpropertyLoading,
  selectpropertyError,
} from "../../app/Slices/propertiesSlice";

const MyTable = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const propertyData = useSelector(selectpropertyData);
  const propertyError = useSelector(selectpropertyError);
  const propertyLoading = useSelector(selectpropertyLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchAllpropertyData(currentPage, searchTerm, location));
  }, [dispatch, currentPage, searchTerm, location]);

  const handleEdit = (propertyno) => {
    console.log("Edit property with property number:", propertyno);
  };

  const handleDelete = (propertyno) => {
    console.log("Delete property with property number:", propertyno);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          colorScheme={i === currentPage ? "blue" : "gray"}
          size="sm"
          mr={2}
          mt={-8}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <ChakraProvider>
      <Box
        overflowX={{ base: "scroll", md: "auto" }}
        borderRadius="30px"
        borderWidth={1}
        borderColor="gray.300"
        p={6}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          mb={10}
          mt={4}
        >
          <Heading fontSize={{ base: "24px", md: "30px" }} ml="10px">
            Properties
          </Heading>
          <InputGroup width={{ base: "100%", md: "220px" }} mt={{ base: 4, md: 0 }} ml={{ md: "450px" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius={40}
            />
          </InputGroup>
          <Box mr={{ base: 0, md: "25px" }} mt={{ base: 4, md: 0 }}>
            <Select
              placeholder="Status"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Location1">Active</option>
              <option value="Location2">Inactive</option>
            </Select>
          </Box>
        </Flex>

        {propertyError && (
          <Text color="red.500" mb={4}>
            {propertyError}
          </Text>
        )}

        <TableContainer>
          <Table size="md">
            <Thead>
              <Tr>
                <Th>Property NO</Th>
                <Th>Name</Th>
                <Th>Assigned To</Th>
                <Th>Mobile No</Th>
                <Th>Status</Th>
                <Th>Wallet</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {propertyLoading ? (
                <Tr>
                  <Td colSpan={7} textAlign="center">
                    Loading...
                  </Td>
                </Tr>
              ) : propertyData.length > 0 ? (
                propertyData.map((item) => (
                  <Tr key={item.propertyno}>
                    <Td>{item.propertyno}</Td>
                    <Td>
                      <Flex alignItems="center">
                        <Avatar name={item.name} size="sm" mr={2} />
                        {item.name}
                      </Flex>
                    </Td>
                    <Td>{item.assignedTo}</Td>
                    <Td>{item.mobileNo}</Td>
                    <Td>{item.status}</Td>
                    <Td>{item.wallet}</Td>
                    <Td>
                      <Button
                        onClick={() => handleEdit(item.propertyno)}
                        size="sm"
                        mr={2}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.propertyno)}
                        size="sm"
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} textAlign="center">
                    No properties found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        
        <Flex justifyContent="space-between" mt={6}>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
       <Flex justifyContent="center" >
          {renderPageButtons()}
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default MyTable;
