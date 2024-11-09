import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  fetchAllUserData,
  addUserData,
  deleteUserData,
  selectUserData,
  selectTotalPages,
  selectUserLoading,
  selectUserError,
} from "../../app/Slices/userSlice";
import NoData from "../Not_Found/NoData";
import Loader from "../Not_Found/Loader";
import AddUser from "./AddUser";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector(selectTotalPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const userData = useSelector(selectUserData);
  const userLoading = useSelector(selectUserLoading);

  const toast = useToast();

  useEffect(() => {
    dispatch(fetchAllUserData(currentPage, searchTerm));
  }, [dispatch, currentPage, searchTerm]);

  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
  };

  const openAddModal = (value) => {
    setIsAddModalOpen(value);
  };

  const handleEdit = (id) => {
    navigate(`/UserList/${id}`);
  };

  const handleAddUser = async (userData) => {
    try {
      await dispatch(addUserData(userData)); // Assuming addUserData handles all user information
      toast({
        title: "User added.",
        description: "The user has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      closeAddUserModal(); // Close the modal after the operation
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteUserData(selectedUserId));
      toast({
        title: "User deleted.",
        description: "The user has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      closeDeleteModal();
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationButtons = () => {
    const pages = [];
    if (currentPage > 1) {
      pages.push(
        <Button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          colorScheme="black"
          variant="outline"
          color="white"
        >
          Previous
        </Button>
      );
    }

    const pageRange = 2;
    let startPage = Math.max(1, currentPage - pageRange);
    let endPage = Math.min(totalPages, currentPage + pageRange);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          colorScheme={i === currentPage ? "teal" : "black"}
          variant="solid"
          color="white"
        >
          {i}
        </Button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <Button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          colorScheme="black"
          variant="outline"
          color="white"
        >
          Next
        </Button>
      );
    }

    return pages;
  };

  const filteredUsers = userData.filter((item) =>
    item.username && typeof item.username === "string"
      ? item.username.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

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
      >
        <Heading
          fontSize={{ base: "24px", md: "30px" }}
          ml="10px"
          mb={2}
          flex="1"
        >
          Users List
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
          <Box>
            <Button
              onClick={() => openAddModal(true)}
              style={{ marginLeft: "10px" }}
            >
              <AddIcon style={{ marginRight: "5px" }} />
              Add User
            </Button>
            <AddUser
              isOpen={isAddModalOpen}
              onClose={() => openAddModal(false)}
              onAddUser={handleAddUser} // Ensure the modal has a way to trigger adding a user
            />
          </Box>
        </Flex>
      </Flex>

      <TableContainer>
        {userLoading ? (
          <Loader />
        ) : (
          <Table size={{ base: "sm", md: "md" }}>
            <Thead>
              <Tr>
                {[
                  "Name",
                  "Email",
                  "Password",
                  "Primary Phone",
                  "Secondary Phone",
                  "Role",
                  "Status",
                  "Profile Photo",
                  "Created By",
                  "Action",
                ].map((header) => (
                  <Th key={header} textAlign="center">
                    {header}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.length === 0 ? (
                <Tr>
                  <Td colSpan={11} textAlign="center">
                    <NoData />
                  </Td>
                </Tr>
              ) : (
                filteredUsers.map((item) => (
                  <Tr key={item._id}>
                    <Td textAlign="center">{item.name}</Td>
                    <Td textAlign="center">{item.email}</Td>
                    <Td textAlign="center">{item.password}</Td>
                    <Td textAlign="center">{item.primaryPhone}</Td>
                    <Td textAlign="center">{item.secondaryPhone}</Td>
                    <Td textAlign="center">{item.role}</Td>
                    <Td textAlign="center">
                      <Text
                        color={
                          item.status === "Active" ? "green.500" : "red.500"
                        }
                      >
                        {item.status}
                      </Text>
                    </Td>
                    <Td textAlign="center">{item.profilePhoto}</Td>
                    <Td textAlign="center">{item.createdBy}</Td>
                    <Td textAlign="center">
                      <Button
                        onClick={() => handleEdit(item._id)}
                        colorScheme="teal"
                        size="sm"
                        mr={3}
                      >
                        Edit
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

      <HStack spacing={4} justifyContent="center" mt={6}>
        {renderPaginationButtons()}
      </HStack>

      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalOverlay />
        <ModalContent bg="black">
          <ModalHeader color="white">Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="white">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </ModalBody>
          <ModalFooter>
            <Button color="white" variant="outline" onClick={closeDeleteModal}>
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

export default UserList;
