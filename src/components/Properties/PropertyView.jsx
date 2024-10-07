import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  EditPropertyData,
  fetchPropertyById,
  selectPropertyById,
  selectpropertyLoading,
  selectpropertyError,
} from '../../app/Slices/propertiesSlice';
import {
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
  const loading = useSelector(selectpropertyLoading);
  const error = useSelector(selectpropertyError);
  const property = useSelector(selectPropertyById);

  useEffect(() => {
    // Fetch property details by ID when component mounts or propertyId changes
    const fetchData = async () => {
      await dispatch(fetchPropertyById(propertyId));
    };
    fetchData();
  }, [dispatch, propertyId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Gather form data
    const formData = {
      propertyFor: event.target.name.value,
      type: event.target.type.value,
      subtype: event.target.subtype.value,
      size: event.target.size.value,
      location: event.target.location.value,
      subLocation: event.target.subLocation.value,
    };

    // Dispatch action to edit property data
    dispatch(EditPropertyData(propertyId, formData));
  };

  // Show loading spinner
  if (loading) {
    return <Spinner size="xl" />;
  }

  // Show error message if there's an error
  if (error) {
    return <Alert status="error">{error}</Alert>;
  }

  // Render the form with property details
  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" mb={4}>
        <Flex wrap="wrap" gap={4}>
          <FormControl>
            <FormLabel htmlFor="name">Property For</FormLabel>
            <Input id="name" name="name" defaultValue={property?.propertyFor} required />
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
