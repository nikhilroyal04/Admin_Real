import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  List,
  ListItem,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllPropertyData,
  fetchPropertyById,
  setPropertyById,
  EditPropertyData,
  setpropertyLoading,
  setPropertyByIdError,
  setpropertyError,
} from '../../app/Slices/propertiesSlice';
import NoData from '../Not_Found/NoData'; // Import NoData component
import Error502 from "../Not_Found/Error502"; // Import Error502 component
import Loader from "../Not_Found/Loader"; // Import Loader component

function PropertyView() {
  const dispatch = useDispatch();
  const toast = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [propertyData, setPropertyData] = useState({
    No: '',
    PropertyFor: '',
    Type: '',
    Subtype: '',
    Size: '',
    Location: '',
    SubLocation: '',
  });

  const properties = useSelector((state) => state.properties.allProperties);
  const loading = useSelector((state) => state.properties.loading);
  const error = useSelector((state) => state.properties.error);

  useEffect(() => {
    const fetchAllProperties = async () => {
      dispatch(setpropertyLoading(true));
      try {
        await dispatch(fetchAllPropertyData());
      } catch (err) {
        dispatch(setpropertyError(err.message));
        toast({
          title: "Error",
          description: "Failed to fetch properties.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        dispatch(setpropertyLoading(false));
      }
    };

    fetchAllProperties();
  }, [dispatch]);

  useEffect(() => {
    const fetchProperty = async () => {
      if (selectedPropertyId) {
        dispatch(setpropertyLoading(true));
        try {
          const action = await dispatch(fetchPropertyById(selectedPropertyId));
          const data = action.payload;
          setPropertyData(data);
          dispatch(setPropertyById(data));
        } catch (err) {
          dispatch(setPropertyByIdError(err.message));
          toast({
            title: "Error",
            description: "Failed to fetch property data.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          dispatch(setpropertyLoading(false));
        }
      }
    };
    fetchProperty();
  }, [dispatch, selectedPropertyId]);

  const openEditModal = (id) => {
    setSelectedPropertyId(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPropertyId(null);
    setPropertyData({
      No: '',
      PropertyFor: '',
      Type: '',
      Subtype: '',
      Size: '',
      Location: '',
      SubLocation: '',
    });
  };

  const handleEdit = async () => {
    try {
      dispatch(setpropertyLoading(true));
      await dispatch(EditPropertyData({ id: selectedPropertyId, ...propertyData }));
      toast({
        title: "Property updated.",
        description: "The property has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      dispatch(setPropertyByIdError(err.message));
      dispatch(setpropertyError(err.message));
      toast({
        title: "Error",
        description: "Failed to update the property.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      dispatch(setpropertyLoading(false));
      closeEditModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      {loading && <Loader />} {/* Show loader while loading */}
      {error && <Error502 />} {/* Show Error502 component on error */}
      {!loading && !error && properties.length === 0 && <NoData />} {/* Show NoData if no properties */}

      {properties.length > 0 && !loading && !error && (
        <List spacing={3}>
          {properties.map((property) => (
            <ListItem key={property.id}>
              <Box borderWidth="1px" borderRadius="lg" p={4}>
                <Box fontWeight="bold">{property.title}</Box>
                <Box>{property.description}</Box>
                <Button mt={2} onClick={() => openEditModal(property.id)} isLoading={loading}>
                  Edit
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Property</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {Object.keys(propertyData).map((key) => (
              <FormControl mt={4} key={key}>
                <FormLabel>{key}</FormLabel>
                <Input
                  name={key}
                  value={propertyData[key]}
                  onChange={handleChange}
                />
              </FormControl>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleEdit} isLoading={loading}>
              Save
            </Button>
            <Button ml={3} onClick={closeEditModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {error && (
        <Box color="red.500" mt={4}>
          {error}
        </Box>
      )}
    </Box>
  );
}

export default PropertyView;
