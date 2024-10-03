import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Button,
} from '@chakra-ui/react';

function PropertyView() {
  const [property, setProperty] = useState({
    id: '12345', // Example pre-filled ID
    propertyFor: '',
    type: '',
    subtype: '',
    size: '',
    location: '',
    subLocation: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Logic to save the property details
    console.log('Saved property:', property);
    // You can add your save logic here (e.g., API call)
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Edit Property Details</Heading>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="id">ID:</FormLabel>
          <Input
            type="text"
            id="id"
            name="id"
            placeholder="Enter ID"
            value={property.id}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="propertyFor">Property For:</FormLabel>
          <Input
            type="text"
            id="propertyFor"
            name="propertyFor"
            placeholder="Enter Property For"
            value={property.propertyFor}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="type">Type:</FormLabel>
          <Input
            type="text"
            id="type"
            name="type"
            placeholder="Enter Type"
            value={property.type}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="subtype">Subtype:</FormLabel>
          <Input
            type="text"
            id="subtype"
            name="subtype"
            placeholder="Enter Subtype"
            value={property.subtype}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="size">Size:</FormLabel>
          <Input
            type="text"
            id="size"
            name="size"
            placeholder="Enter Size"
            value={property.size}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="location">Location:</FormLabel>
          <Input
            type="text"
            id="location"
            name="location"
            placeholder="Enter Location"
            value={property.location}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="subLocation">SubLocation:</FormLabel>
          <Input
            type="text"
            id="subLocation"
            name="subLocation"
            placeholder="Enter SubLocation"
            value={property.subLocation}
            onChange={handleChange}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSave}>
          Save
        </Button>
      </Stack>
    </Box>
  );
}

export default PropertyView;
