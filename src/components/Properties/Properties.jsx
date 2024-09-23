// src/MyTable.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tfoot,
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
  Text,
  Avatar,
  Select,
  List,
  ListItem,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { selectProperties } from '../../app/Slices/PropSlice'; // Adjust the import path as needed

const MyTable = () => {
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of items per page

  const data = useSelector(selectProperties); // Get data from Redux store

  // Filter data based on search term and selected filter
  const filteredData = data.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === '' || item.category === filter; // Assuming `item.category` exists
    return matchesSearchTerm && matchesFilter;
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleEdit = (id) => {
    console.log('Edit user with id:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete user with id:', id);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
          <Heading fontSize='30px' ml='10px'>Members</Heading>
          <InputGroup width="250px" ml='440px'>
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
      {/* New Filter Dropdown */}
         <Box mr='25px'>
          <Select placeholder="Active" onChange={(e) => setFilter(e.target.value)}>
            <option value="fruit">Fruits</option>
            <option value="vegetable">Vegetables</option>
            <option value="dairy">Dairy</option>
          </Select>
        </Box>
        </Flex>
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Assigned To:</Th>
                <Th>Mobile No</Th>
                <Th>Status</Th>
                <Th>Wallet</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedData.map(item => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>
                    <Flex alignItems="center">
                      <Avatar name={item.name} size="sm" mr={2} />
                      {item.name}
                    </Flex>
                  </Td>
                  <Td>{item.assignedto}</Td>
                  <Td>{item.mobileno}</Td>
                  <Td>{item.status}</Td>
                  <Td>{item.wallet}</Td>
                  <Td>
                    <Button onClick={() => handleEdit(item.id)} colorScheme="blue" size="sm" mr={2}>Edit</Button>
                    <Button onClick={() => handleDelete(item.id)} colorScheme="red" size="sm">Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan={7}>
                  <Flex justifyContent="space-between">
                    <Button onClick={handlePrevious} isDisabled={currentPage === 1}>Previous</Button>
                    <Text mt={5}>Page {currentPage} of {totalPages}</Text>
                    <Button onClick={handleNext} isDisabled={currentPage === totalPages}>Next</Button>
                  </Flex>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </ChakraProvider>
  );
};

export default MyTable;
