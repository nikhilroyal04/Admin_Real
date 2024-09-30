import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { EditPropertyData, fetchAllPropertyData, selectpropertyData, selectpropertyLoading, selectpropertyError } from '../../app/Slices/propertiesSlice';
import Loader from "../Not_Found/Loader";

function ViewPage() {
  const dispatch = useDispatch();
  const properties = useSelector(selectpropertyData);
  const isLoading = useSelector(selectpropertyLoading);
  const propertyError = useSelector(selectpropertyError);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [propertyData, setPropertyData] = useState({ name: '', address: '' });
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch property data on mount
  useEffect(() => {
    dispatch(fetchAllPropertyData());
  }, [dispatch]);

  const openEditModal = (property) => {
    setSelectedPropertyId(property._id);
    setPropertyData({ name: property.name, address: property.address });
    onOpen();
  };

  const closeModal = () => {
    onClose();
    setSelectedPropertyId(null);
    setPropertyData({ name: '', address: '' }); // Reset property data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      await dispatch(EditPropertyData({ id: selectedPropertyId, data: propertyData })).unwrap();
      toast({
        title: "Property updated.",
        description: "The property has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update the property.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      closeModal();
    }
  };

  // Display loader if loading
  if (isLoading) {
    return <Loader />;
  }

  // Display error message if there's an error
  if (propertyError) {
    return <div>Error: {propertyError}</div>;
  }

  return (
    <>
      {properties.map((item) => (
        <Button
          key={item._id}
          onClick={() => openEditModal(item)}
          colorScheme="teal"
          size="sm"
          mr={2}
        >
          View
        </Button>
      ))}

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Property</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <input
                type="text"
                name="name"
                value={propertyData.name}
                onChange={handleChange}
                placeholder="Property Name"
              />
              <input
                type="text"
                name="address"
                value={propertyData.address}
                onChange={handleChange}
                placeholder="Property Address"
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleEdit}>
              Save
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewPage;
