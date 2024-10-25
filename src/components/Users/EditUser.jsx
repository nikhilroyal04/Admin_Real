import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from '@chakra-ui/react';
import { updateUserData } from '../path/to/actions'; // Import your update action
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

const YourComponent = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Replace with your logic
  const [userData, setUserData] = useState({ name: '', email: '' }); // Adjust fields as needed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      await dispatch(updateUserData(selectedUserId, userData));
      toast({
        title: "User updated.",
        description: "The user information has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Optionally refresh the user list or update the UI here
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
      onClose(); // Close the modal
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Edit User</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Enter user's name"
              />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter user's email"
                type="email"
              />
            </FormControl>
            {/* Add more fields as necessary */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={handleEdit} 
              isLoading={loading} 
              ml={3}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default YourComponent;
