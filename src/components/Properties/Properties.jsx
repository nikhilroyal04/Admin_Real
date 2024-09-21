import React, { useState } from 'react';
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
  Avatar,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const MyTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Number of items per page

  const data = [
    { id: 1, name: 'Alice', status: 'Active', email: 'alice@example.com', role: 'Admin', avatar: 'https://bit.ly/broken-link' },
    { id: 2, name: 'Bob', status: 'Active', email: 'bob@example.com', role: 'User', avatar: 'https://bit.ly/broken-link' },
    { id: 3, name: 'Charlie', status: 'Active', email: 'charlie@example.com', role: 'User', avatar: 'https://bit.ly/broken-link' },
    { id: 4, name: 'David', status: 'Active', email: 'david@example.com', role: 'User', avatar: 'https://bit.ly/broken-link' },
    { id: 5, name: 'Eve', status: 'Active', email: 'eve@example.com', role: 'Admin', avatar: 'https://bit.ly/broken-link' },
    { id: 6, name: 'Frank', status: 'Active', email: 'frank@example.com', role: 'User', avatar: 'https://bit.ly/broken-link' },
    { id: 7, name: 'Grace', status: 'Active', email: 'grace@example.com', role: 'User', avatar: 'https://bit.ly/broken-link' },
    { id: 8, name: 'Heidi', status: 'Active', email: 'heidi@example.com', role: 'User', avatar: 'https://bit.ly/broken-link' },
  ];

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Box overflowX="auto">
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
          <Heading as="h4">Members</Heading>
          <InputGroup width="300px">
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
        </Flex>
        <Box>
          <Table variant="striped" colorScheme="gray" borderWidth="1px" borderColor="gray.300">
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Status</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map(item => (
                  <Tr key={item.id}>
                    <Td>{item.id}</Td>
                    <Td>
                      <Avatar size="sm" name={item.name} src={item.avatar} mr={2} />
                      {item.name}
                    </Td>
                    <Td>{item.status}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.role}</Td>
                    <Td>
                      <Button colorScheme="blue" size="sm" onClick={() => handleEdit(item.id)} mr={2}>
                        Edit
                      </Button>
                      <Button colorScheme="red" size="sm" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={6} textAlign="center">No results found</Td>
                </Tr>
              )}
            </Tbody>
            <Tfoot>
              <Tr>
                <Td colSpan={5}>
                  <Text color="#8b8b8b" display="inline">
                    Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} results
                  </Text>
                </Td>
                <Td>
                  <Flex justify="flex-end" mt={2}>
                    <Button onClick={handlePrevious} isDisabled={currentPage === 1} mr={2}>
                      Previous
                    </Button>
                    <Button onClick={handleNext} isDisabled={currentPage === totalPages}>
                      Next
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default MyTable;
