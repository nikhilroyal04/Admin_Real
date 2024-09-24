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
} from "../../app/Slices/propertiesSlice"; // Adjust the import path as needed

const MyTable = () => {
  const dispatch = useDispatch();
  const [filters, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const propertyData = useSelector(selectpropertyData);
  const propertyError = useSelector(selectpropertyError);
  const propertyLoading = useSelector(selectpropertyLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    // Fetch data with current filters and page
    dispatch(
      fetchAllpropertyData(
        currentPage,
        "",
        filters.location,
        filters.subLocation,
        filters.propertyFor,
        filters.propertyType,
        filters.propertySubtype
      )
    );
  }, [dispatch, filters, currentPage]);


  const handleEdit = (id) => {
    console.log("Edit property with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete property with id:", id);
  };

  return (
    <ChakraProvider>
      <Box
        overflowX="auto"
        borderRadius="30px"
        borderWidth={1}
        borderColor="gray.300"
        p={4}
      >
        <Flex alignItems="center" justifyContent="space-between" mb={10} mt={4}>
          <Heading fontSize="30px" ml="10px">
            Properties
          </Heading>
          <InputGroup width="250px">
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
          {/* Updated Filter Dropdown */}
          <Box mr="25px">
            <Select
              placeholder="Select Status"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </Box>
        </Flex>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Assigned To</Th>
                <Th>Mobile No</Th>
                <Th>Status</Th>
                <Th>Wallet</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {propertyData.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>
                    <Flex alignItems="center">
                      <Avatar name={item.name} size="sm" mr={2} />
                      {item.name}
                    </Flex>
                  </Td>
                  <Td>{item.assignedTo}</Td> {/* Corrected casing */}
                  <Td>{item.mobileNo}</Td> {/* Corrected casing */}
                  <Td>{item.status}</Td>
                  <Td>{item.wallet}</Td>
                  <Td>
                    <Button
                      onClick={() => handleEdit(item.id)}
                      colorScheme="blue"
                      size="sm"
                      mr={2}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      colorScheme="red"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex justifyContent="space-between" mt={4}>
          <Button
            onClick={() => dispatch(previousPage())}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
          <Button
            onClick={() => dispatch(nextPage())}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default MyTable;
