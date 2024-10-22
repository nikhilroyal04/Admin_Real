import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  FormControl,
  FormLabel,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { addUserData } from "../../app/Slices/userSlice";

const AddUser = () => {
  const [users, setUsers] = useState([]);
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleClick = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError("Name, email, and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await dispatch(addUserData(newUser));
      setUsers([...users, { ...newUser, no: users.length + 1 }]);
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
    } catch (err) {
      setError("Failed to add user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Button isLoading={loading} onClick={handleClick} leftIcon={<AddIcon />} colorScheme="teal">
          Add User
        </Button>
      </Box>

      {error && <Text color="red.500">{error}</Text>}

      {/* Form Inputs for New User */}
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Enter name"
        />

        <FormLabel mt={4}>Email</FormLabel>
        <Input
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Enter email"
        />

        <FormLabel mt={4}>Password</FormLabel>
        <Input
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="Enter password"
        />

        <FormLabel mt={4}>Primary Phone</FormLabel>
        <Input
          value={newUser.primaryPhone}
          onChange={(e) => setNewUser({ ...newUser, primaryPhone: e.target.value })}
          placeholder="Enter primary phone"
        />

        <FormLabel mt={4}>Secondary Phone</FormLabel>
        <Input
          value={newUser.secondaryPhone}
          onChange={(e) => setNewUser({ ...newUser, secondaryPhone: e.target.value })}
          placeholder="Enter secondary phone"
        />

        <FormLabel mt={4}>Role</FormLabel>
        <Input
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          placeholder="Enter role"
        />

        <FormLabel mt={4}>Status</FormLabel>
        <Input
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
          placeholder="Enter status"
        />

        <FormLabel mt={4}>Created By</FormLabel>
        <Input
          value={newUser.createdBy}
          onChange={(e) => setNewUser({ ...newUser, createdBy: e.target.value })}
          placeholder="Enter creator's name"
        />

        <FormLabel mt={4}>Profile Photo URL</FormLabel>
        <Input
          value={newUser.profilePhoto}
          onChange={(e) => setNewUser({ ...newUser, profilePhoto: e.target.value })}
          placeholder="Enter profile photo URL"
        />
      </FormControl>

      <Table size="sm" mt={4}>
        <Thead>
          <Tr>
            <Th textAlign="center">No.</Th>
            <Th textAlign="center">Name</Th>
            <Th textAlign="center">Email</Th>
            <Th textAlign="center">Password</Th>
            <Th textAlign="center">Primary Phone</Th>
            <Th textAlign="center">Secondary Phone</Th>
            <Th textAlign="center">Role</Th>
            <Th textAlign="center">Status</Th>
            <Th textAlign="center">Created By</Th>
            <Th textAlign="center">Profile Photo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item, index) => (
            <Tr key={index}>
              <Td textAlign="center">{index + 1}</Td>
              <Td textAlign="center">{item.name}</Td>
              <Td textAlign="center">{item.email}</Td>
              <Td textAlign="center">********</Td> {/* Masking password for security */}
              <Td textAlign="center">{item.primaryPhone}</Td>
              <Td textAlign="center">{item.secondaryPhone}</Td>
              <Td textAlign="center">{item.role}</Td>
              <Td textAlign="center">{item.status}</Td>
              <Td textAlign="center">{item.createdBy}</Td>
              <Td textAlign="center">{item.profilePhoto}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AddUser;
