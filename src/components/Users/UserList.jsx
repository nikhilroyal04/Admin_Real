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
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons';
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  fetchAllUserData,
  deleteUserData,
  selectUserData,
  selectTotalPages,
  selectUserLoading,
  selectUserError,
} from "../../app/Slices/userSlice"; // Adjusted import for user slice
import NoData from "../Not_Found/NoData";
//import Error502 from "../Not_Found/Error502";
import Loader from "../Not_Found/Loader";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const userData = useSelector(selectUserData);
  const userError = useSelector(selectUserError);
  const userLoading = useSelector(selectUserLoading);
  const totalPages = useSelector(selectTotalPages);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchAllUserData(1, searchTerm)); // Fetch all user data on mount
  }, [dispatch, searchTerm]);

  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleClick = () => {
    navigate('/adduser'); // Navigate to the AddUser component
  };

  const handleEdit = (id) => {
    navigate(`/UserList/${id}`); // Navigate to user detail view
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
      closeModal();
    }
  };

  const filteredUsers = userData.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if (userError) {
  //   return <Error502 />;
  // }

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
          UsersList
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
          <Box ml={4}>
            <Button
              onClick={handleClick}
              leftIcon={<AddIcon />}
              colorScheme="teal"
            >
              AddUser
            </Button>
          </Box>
        </Flex>
      </Flex>

      <TableContainer>
  {userLoading ? (
    <Loader />
  ) : (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th textAlign="center">No.</Th>
          <Th textAlign="center">Name</Th>
          <Th textAlign="center">Email</Th>
          <Th textAlign="center">Password</Th>
          <Th textAlign="center">PrimaryPhone</Th>
          <Th textAlign="center">SecondaryPhone</Th>
          <Th textAlign="center">Role</Th>
          <Th textAlign="center">Status</Th>
          <Th textAlign="center">CreatedBy</Th>
          <Th textAlign="center">ProfilePhoto</Th>
          <Th textAlign="center">Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredUsers.length === 0 ? (
          <Tr>
            <Td colSpan={9} textAlign="center">
              <NoData />
            </Td>
          </Tr>
        ) : (
          filteredUsers.map((item, index) => (
            <Tr key={item._id}>
              <Td textAlign="center">{index + 1}</Td>
              <Td textAlign="center">{item.name}</Td>
              <Td textAlign="center">{item.email}</Td>
              <Td textAlign="center">{item.password}</Td>
              <Td textAlign="center">{item.primaryPhone}</Td>
              <Td textAlign="center">{item.secondaryPhone}</Td>
              <Td textAlign="center">{item.role}</Td>
              <Td textAlign="center">{item.status}</Td>
              <Td textAlign="center">{item.createdBy}</Td>
              <Td textAlign="center">{item.profilePhoto}</Td>
              <Td textAlign="center">
                <Text color={item.status === "Active" ? "green.500" : "red.500"}>
                  {item.status}
                </Text>
              </Td>
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


      {/* Delete Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent bg="black">
          <ModalHeader color="white">Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="white">
            Are you sure you want to delete this user? This action cannot be
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

export default UserList;
