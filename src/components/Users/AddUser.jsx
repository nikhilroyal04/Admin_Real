import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllUserData,
  addUserData,
  setUserError,
} from "../../app/Slices/userSlice";

const AddUser = ({ isOpen, onClose }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    primaryPhone: "",
    secondaryPhone: "",
    role: "",
    status: "",
    createdBy: "",
    profilePhoto: "",
  });
  
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddUser = async () => {
    try {
      const timestamp = new Date().toISOString();
      const userWithTimestamp = { ...newUser, updatedOn: timestamp };

      await dispatch(addUserData(userWithTimestamp));
      toast({
        title: "User added.",
        description: "The user has been successfully added.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset newUser state
      setNewUser({
        name: "",
        email: "",
        password: "",
        primaryPhone: "",
        secondaryPhone: "",
        role: "",
        status: "",
        createdBy: "",
        profilePhoto: "",
      });

      // Fetch all users again
      dispatch(fetchAllUserData());

      onClose(); // Close the modal after adding the user
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };
  
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="black">
          <ModalHeader color="white">Add New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody color="white">
            <Input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              mb={3}
              borderColor="gray.300"
              aria-label="User Name"
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              mb={3}
              borderColor="gray.300"
              aria-label="User Email"
            />
            <Input
              placeholder="Password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              mb={3}
              borderColor="gray.300"
              aria-label="User Password"
            />
            <Input
              placeholder="Primary Phone"
              value={newUser.primaryPhone}
              onChange={(e) => setNewUser({ ...newUser, primaryPhone: e.target.value })}
              mb={3}
              borderColor="gray.300"
              aria-label="Primary Phone"
            />
            <Input
              placeholder="Secondary Phone"
              value={newUser.secondaryPhone}
              onChange={(e) => setNewUser({ ...newUser, secondaryPhone: e.target.value })}
              mb={3}
              borderColor="gray.300"
              aria-label="Secondary Phone"
            />
            <Select
              placeholder="Select Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              mb={3}
              borderColor="gray.300"
              aria-label="User Role"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="viewer">Viewer</option>
            </Select>
            <Select
              placeholder="Select Status"
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              mb={3}
              borderColor="gray.300"
              aria-label="User Status"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </Select>
            <Input
              placeholder="Profile Photo URL"
              value={newUser.profilePhoto}
              onChange={(e) => setNewUser({ ...newUser, profilePhoto: e.target.value })}
              mb={3}
              borderColor="gray.300"
              aria-label="Profile Photo"
            />
            <Input
              placeholder="Created By"
              value={newUser.createdBy}
              onChange={(e) => setNewUser({ ...newUser, createdBy: e.target.value })}
              mb={3}
              borderColor="gray.300"
              aria-label="Created By"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="white" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleAddUser} ml={3}>
              Add User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddUser;
