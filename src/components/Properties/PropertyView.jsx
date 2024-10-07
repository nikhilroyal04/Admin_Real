import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditPropertyData,fetchAllPropertyData } from '../../app/Slices/propertiesSlice';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Alert,
} from '@chakra-ui/react';

const PropertyView = ({ propertyId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const property = useSelector((state) => state.properties[propertyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllPropertyData(propertyId)); // Assume this action fetches property data
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, propertyId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      name: event.target.name.value,
      type: event.target.type.value,
      subtype: event.target.subtype.value,
      size: event.target.size.value,
      location: event.target.location.value,
      subLocation: event.target.subLocation.value,
    };

    dispatch(EditPropertyData(propertyId, formData)); // Dispatch the edit action
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Alert status="error">{error}</Alert>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" mb={4}>
        <Flex wrap="wrap" gap={4}>
          <FormControl>
            <FormLabel htmlFor="name">Property For</FormLabel>
            <Input id="name" name="name" defaultValue={property?.name} required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="type">Type</FormLabel>
            <Input id="type" name="type" defaultValue={property?.type} required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="subtype">Subtype</FormLabel>
            <Input id="subtype" name="subtype" defaultValue={property?.subtype} required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="size">Size</FormLabel>
            <Input id="size" name="size" defaultValue={property?.size} required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input id="location" name="location" defaultValue={property?.location} required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="subLocation">SubLocation</FormLabel>
            <Input id="subLocation" name="subLocation" defaultValue={property?.subLocation} required />
          </FormControl>
        </Flex>
      </Flex>
      <Button type="submit" colorScheme="blue">Update Property</Button>
    </form>
  );
};

export default PropertyView;
