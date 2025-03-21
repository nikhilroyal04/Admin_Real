import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
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
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  fetchAllPropertyData,
  DeletePropertyData,
  selectpropertyData,
  selectTotalPages,
  selectpropertyLoading,
  selectpropertyError,
} from "../../app/Slices/propertiesSlice";
import NoData from "../Not_Found/NoData";
import Error502 from "../Not_Found/Error502";
import Loader from "../Not_Found/Loader";

const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [filters, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const propertyData = useSelector(selectpropertyData);
  const propertyError = useSelector(selectpropertyError);
  const propertyLoading = useSelector(selectpropertyLoading);
  const totalPages = useSelector(selectTotalPages);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchAllPropertyData(currentPage, "", searchTerm));
  }, [dispatch, filters, currentPage, searchTerm]);

  const openDeleteModal = (id) => {
    setSelectedPropertyId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPropertyId(null);
  };

  const handleView = (id) => {
    navigate(`/properties/${id}`);
  };

  const handleDelete = async () => {
    try {
      await dispatch(DeletePropertyData(selectedPropertyId));
      toast({
        title: "Property deleted.",
        description: "The property has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the property.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      closeModal();
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFirstPage = () => handlePageChange(1);
  const handleLastPage = () => handlePageChange(totalPages);
  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const renderPaginationButtons = () => {
    const pages = [];
    if (currentPage > 2) {
      pages.push(
        <Button
          key="first"
          onClick={handleFirstPage}
          colorScheme="black"
          variant="outline"
          color="white"
        >
          First
        </Button>
      );
    }
    if (currentPage > 1) {
      pages.push(
        <Button
          key="prev"
          onClick={handlePrevPage}
          colorScheme="black"
          variant="outline"
          color="white"
        >
          Previous
        </Button>
      );
    }

    const pageRange = 3;
    let startPage = Math.max(1, currentPage - pageRange);
    let endPage = Math.min(totalPages, currentPage + pageRange);

    if (startPage > 1) {
      pages.push(
        <Button
          key="1"
          onClick={() => handlePageChange(1)}
          colorScheme="black"
          variant="solid"
          color="white"
        >
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(<Text key="dots1">...</Text>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          colorScheme={i === currentPage ? "teal" : "black"}
          variant="solid"
          color={i === currentPage ? "white" : "white"}
          disabled={i === currentPage}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<Text key="dots2">...</Text>);
      }
      pages.push(
        <Button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          colorScheme="black"
          variant="solid"
          color="white"
        >
          {totalPages}
        </Button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <Button
          key="next"
          onClick={handleNextPage}
          colorScheme="black"
          variant="outline"
          color="white"
        >
          Next
        </Button>
      );
    }

    if (totalPages > 2) {
      pages.push(
        <Button
          key="last"
          onClick={handleLastPage}
          colorScheme="black"
          variant="outline"
          color="white"
        >
          Last
        </Button>
      );
    }

    return pages;
  };

  const filteredProperties = propertyData.filter((item) => {
    const matchesSearch = item.propertyNo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus
      ? item.status === selectedStatus
      : true;

    return matchesSearch && matchesStatus;
  });

  // Display error message if there's an error
  if (propertyError) {
    return <Error502 />;
  }

  return (
    <Box
      overflowX="auto"
      borderRadius="30px"
      borderWidth={1}
      borderColor="gray.300"
      p={4}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        mt={4}
        flexWrap="wrap"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Heading fontSize="30px" ml="10px" mb={2} flex="1">
          Properties
        </Heading>
        <Flex
          alignItems="center"
          mb={2}
          flex="1"
          justifyContent="flex-end"
          flexDirection={{ base: "column", md: "row" }}
        >
          <InputGroup width="250px" mr={4}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search by Property No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius={40}
            />
          </InputGroup>
          <Menu _hover={{ border: "1px solid white", bg: "transparent" }}>
            <MenuButton
              as={Button}
              bg="black"
              _hover={{ bg: "transparent" }}
              border="1px solid gray"
              color="white"
              mt={{ base: "15px", md: "0" }}
              rightIcon={<ChevronDownIcon color="white" />}
            >
              {selectedStatus || "Select Status"}
            </MenuButton>
            <MenuList bg="black" color="white">
              <MenuItem
                onClick={() => setSelectedStatus("")}
                border="1px solid gray"
                bg="black"
                _hover={{ border: "1px solid white", bg: "black" }}
              >
                All
              </MenuItem>
              <MenuItem
                onClick={() => setSelectedStatus("Active")}
                border="1px solid gray"
                bg="black"
                _hover={{ border: "1px solid white", bg: "black" }}
              >
                Active
              </MenuItem>
              <MenuItem
                onClick={() => setSelectedStatus("Inactive")}
                border="1px solid gray"
                bg="black"
                _hover={{ border: "1px solid white", bg: "black" }}
              >
                Inactive
              </MenuItem>
              <MenuItem
                onClick={() => setSelectedStatus("Pending")}
                bg="black"
                border="1px solid gray"
                _hover={{ border: "1px solid white", bg: "black" }}
              >
                Pending
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Table Content with conditional loading */}
      <TableContainer>
        {propertyLoading ? (
          <Loader />
        ) : (
          <Table size="sm">
            <Thead>
              <Tr>
                <Th textAlign="center">No.</Th>
                <Th textAlign="center">Property For</Th>
                <Th textAlign="center">Type</Th>
                <Th textAlign="center">Subtype</Th>
                <Th textAlign="center">Size</Th>
                <Th textAlign="center">Location</Th>
                <Th textAlign="center">SubLocation</Th>
                <Th textAlign="center">Status</Th>
                <Th textAlign="center">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredProperties.length === 0 ? (
                <Tr>
                  <Td colSpan={9} textAlign="center">
                    <NoData />
                  </Td>
                </Tr>
              ) : (
                filteredProperties.map((item) => (
                  <Tr key={item._id}>
                    <Td textAlign="center">{item.propertyNo}</Td>
                    <Td textAlign="center">{item.propertyFor}</Td>
                    <Td textAlign="center">{item.propertyType}</Td>
                    <Td textAlign="center">{item.propertySubtype}</Td>
                    <Td textAlign="center">{item.size}</Td>
                    <Td textAlign="center">{item.location}</Td>
                    <Td textAlign="center">{item.subLocation}</Td>
                    <Td textAlign="center">
                      <Text
                        color={
                          item.status === "Active"
                            ? "green.500"
                            : item.status === "Inactive"
                            ? "red.500"
                            : "yellow.500"
                        }
                      >
                        {item.status}
                      </Text>
                    </Td>
                    <Td>
                      <Button
                        onClick={() => handleView(item._id)}
                        colorScheme="teal"
                        size="sm"
                        mr={3}
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => openDeleteModal(item._id)}
                        colorScheme="red"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        )}
      </TableContainer>

      {/* Pagination controls */}
      <HStack spacing={4} justifyContent="center" mt={6}>
        {renderPaginationButtons()}
      </HStack>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent bg="black">
          <ModalHeader color="white">Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="white">
            Are you sure you want to delete this property? This action cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button color="white" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Properties;
