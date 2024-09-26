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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  fetchAllpropertyData,
  selectpropertyData,
  selectTotalPages,
  selectpropertyLoading,
  selectpropertyError,
  editPropertyData,
} from "../../app/Slices/propertiesSlice";

const MyTable = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [propertyToEdit, setPropertyToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    propertyNo: "",
    propertyFor: "",
    propertyType: "",
    propertySubtype: "",
    size: "",
    location: "",
    subLocation: "",
  });

  const propertyData = useSelector(selectpropertyData);
  const propertyError = useSelector(selectpropertyError);
  const propertyLoading = useSelector(selectpropertyLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchAllpropertyData(currentPage, searchTerm, location));
  }, [dispatch, currentPage, searchTerm, location]);

  const handleEdit = (property) => {
    setEditFormData(property); // Set the selected property data for editing
    setIsEditOpen(true); // Open the edit modal
  };

  const handleEditSubmit = () => {
    setIsEditConfirmOpen(true); // Open the confirmation modal when saving
  };

  const handleEditConfirm = () => {
    dispatch(editPropertyData(editFormData)); // Dispatch your edit action
    setIsEditOpen(false);
    setIsEditConfirmOpen(false);
  };

  const handleDelete = () => {
    console.log("Delete property with property number:", propertyToDelete);
    // Call your delete action here if needed
    setIsDeleteOpen(false);
    setPropertyToDelete(null);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => (
      <Button
        key={index + 1}
        onClick={() => handlePageClick(index + 1)}
        colorScheme={index + 1 === currentPage ? "blue" : "gray"}
        size="sm"
        mr={2}
      >
        {index + 1}
      </Button>
    ));
  };

  return (
    <ChakraProvider>
      <Box
        overflowX="auto"
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
                <Th>Property For</Th>
                <Th>Property Type</Th>
                <Th>Property Subtype</Th>
                <Th>Size</Th>
                <Th>Location</Th>
                <Th>Sublocation</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {propertyLoading ? (
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    Loading...
                  </Td>
                </Tr>
              ) : propertyData.length > 0 ? (
                propertyData.map((item) => (
                  <Tr key={item.propertyNo}>
                    <Td>{item.propertyNo}</Td>
                    <Td>
                      <Flex alignItems="center">
                        <Avatar name={item.propertyFor} size="sm" mr={2} />
                        {item.propertyFor}
                      </Flex>
                    </Td>
                    <Td>{item.propertyType}</Td>
                    <Td>{item.propertySubtype}</Td>
                    <Td>{item.size}</Td>
                    <Td>{item.location}</Td>
                    <Td>{item.subLocation}</Td>
                    <Td>
                      <Button
                        onClick={() => handleEdit(item)}
                        size="sm"
                        mr={2}
                        variant="outline"
                        isDisabled={propertyLoading}
                      >
                      View
                      </Button>
                      <Button
                        onClick={() => {
                          setPropertyToDelete(item.propertyNo);
                          setIsDeleteOpen(true);
                        }}
                        size="sm"
                        variant="outline"
                        isDisabled={propertyLoading}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={8} textAlign="center">
                    No properties found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <Flex justifyContent="center" mt={6} mb={4}>
          {currentPage > 1 && (
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={propertyLoading}
              mr={2}
              variant="outline"
            >
              Previous
            </Button>
          )}
          {renderPageButtons()}
          {currentPage < totalPages && (
            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              isDisabled={propertyLoading}
              ml={2}
              variant="outline"
            >
              Next
            </Button>
          )}
        </Flex>

        {/* Confirmation Modal for Deleting */}
        <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalBody>
              Are you sure you want to delete property number {propertyToDelete}?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleDelete}>
                Confirm
              </Button>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Confirmation Modal for Editing */}
        <Modal isOpen={isEditConfirmOpen} onClose={() => setIsEditConfirmOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Edit</ModalHeader>
            <ModalBody>
              Are you sure you want to save changes to property number {editFormData.propertyNo}?
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleEditConfirm}>
                Confirm
              </Button>
              <Button variant="outline" onClick={() => setIsEditConfirmOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Edit Modal */}
        <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Property</ModalHeader>
            <ModalBody>
              <Input
                placeholder="Property For"
                value={editFormData.propertyFor}
                onChange={(e) => setEditFormData({ ...editFormData, propertyFor: e.target.value })}
                mb={4}
              />
              <Input
                placeholder="Property Type"
                value={editFormData.propertyType}
                onChange={(e) => setEditFormData({ ...editFormData, propertyType: e.target.value })}
                mb={4}
              />
              <Input
                placeholder="Property Subtype"
                value={editFormData.propertySubtype}
                onChange={(e) => setEditFormData({ ...editFormData, propertySubtype: e.target.value })}
                mb={4}
              />
              <Input
                placeholder="Size"
                value={editFormData.size}
                onChange={(e) => setEditFormData({ ...editFormData, size: e.target.value })}
                mb={4}
              />
              <Input
                placeholder="Location"
                value={editFormData.location}
                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                mb={4}
              />
              <Input
                placeholder="Sublocation"
                value={editFormData.subLocation}
                onChange={(e) => setEditFormData({ ...editFormData, subLocation: e.target.value })}
                mb={4}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default MyTable;
