import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Select,
} from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectPropertyById,
  selectpropertyLoading,
  selectpropertyError,
  fetchPropertyById,
  EditPropertyData,
} from "../../app/Slices/propertiesSlice";
import Loader from "../Not_Found/Loader";
import Error502 from "../Not_Found/Error502";

export default function PropertyView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const property = useSelector(selectPropertyById);
  const loading = useSelector(selectpropertyLoading);
  const error = useSelector(selectpropertyError);

  const [isEditMode, setIsEditMode] = useState(false);
  const [images, setImages] = useState([]);

  const handleClick1 = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [formData, setFormData] = useState({
    projectName: "",
    property: "",
    propertyFor: "",
    propertyType: "",
    propertySubtype: "",
    size: "",
    location: "",
    subLocation: "",
    address: "",
    currentCost: "",
    offeredCost: "",
    returnRY: "",
    status: "Pending",
    reraApproved: "",
    reraNo: "",
    createdBy: "",
    loanApplicable: "",
    paymentOptions: "",
    media: [],
    facility: [],
    connectivity: [],
    documents: [],
    usp: [],
    registeredNo: "",
    createdOn: "",
    updatedOn: Date.now(),
  }); // Single state for form data

  useEffect(() => {
    dispatch(fetchPropertyById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (property) {
      setFormData({
        projectName: property.projectName,
        property: property.property,
        propertyFor: property.propertyFor,
        propertyType: property.propertyType,
        propertySubtype: property.propertySubtype,
        size: property.size,
        location: property.location,
        subLocation: property.subLocation,
        address: property.address,
        currentCost: property.currentCost,
        offeredCost: property.offeredCost,
        returnRY: property.returnRY,
        status: property.status,
        reraApproved: property.reraApproved,
        reraNo: property.reraNo,
        createdBy: property.createdBy,
        loanApplicable: property.loanApplicable,
        paymentOptions: property.paymentOptions,
        media: property.media || [],
        facility: property.facility || [],
        connectivity: property.connectivity || [],
        documents: property.documents || [],
        usp: property.usp || [],
        registeredNo: property.registeredNo,
        createdOn: property.createdOn,
        updatedOn: Date.now(),
      });
    }
  }, [property]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error502 />;
  }

  // Handle save (dispatch action to edit property)
  const handleSave = async () => {
    await dispatch(EditPropertyData(id, formData)); // Wait for the edit action to complete
    dispatch(fetchPropertyById(id)); // Fetch updated property data
    setIsEditMode(false); // Exit edit mode after saving
  };

  // Handle cancel (exit edit mode without saving)
  const handleCancel = () => {
    setIsEditMode(false);
    setFormData({
      projectName: property.projectName,
      property: property.property,
      propertyFor: property.propertyFor,
      propertyType: property.propertyType,
      propertySubtype: property.propertySubtype,
      size: property.size,
      location: property.location,
      subLocation: property.subLocation,
      address: property.address,
      currentCost: property.currentCost,
      offeredCost: property.offeredCost,
      returnRY: property.returnRY,
      status: property.status,
      reraApproved: property.reraApproved,
      reraNo: property.reraNo,
      createdBy: property.createdBy,
      loanApplicable: property.loanApplicable,
      paymentOptions: property.paymentOptions,
      media: property.media,
      facility: property.facility || [],
      connectivity: property.connectivity || [],
      documents: property.documents || [],
      usp: property.usp || [],
      registeredNo: property.registeredNo,
      createdOn: property.createdOn,
      updatedOn: property.updatedOn,
    });
  };

  return (
    <Box p={6}>
      {/* Image section - 6 larger boxes */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} sx={{ display: "flex", flexWrap: "wrap" }}>
          {images.slice(0, 6).map((preview, index) => (
            <Box
              key={index}
              height="150px" // Fixed height
              width="150px" // Fixed width
              textAlign="center"
              overflow="hidden" // Hide overflow
              position="relative"
              borderWidth="1px"
              borderRadius="md"
              marginLeft="10px"
            >
              <Image
                src={preview}
                alt={`Preview ${index}`}
                style={{
                  width: "100%", // Fill the box
                  height: "100%", // Fill the box
                  objectFit: "cover", // Maintain aspect ratio
                }}
              />
            </Box>
          ))}
          {/* Show a "More" card if there are more than 6 images */}
          {images.length < 4 && (
            <Box
              height="150px"
              width="150px"
              textAlign="center"
              overflowY="auto"
              position="relative"
              borderWidth="1px"
              borderRadius="md"
              marginLeft="10px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={handleClick1}
              cursor="pointer"
            >
              <GrAdd style={{ width: "30px", height: "30px" }} />
              Add Image
            </Box>
          )}

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the file input
          />
        </Grid>
      </Grid>

      {/* Property details form */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={6}
        mt="60px"
      >
        <FormControl>
          <FormLabel>Project Name</FormLabel>
          <Input
            name="projectName"
            value={formData.projectName}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Property Name</FormLabel>
          <Input
            name="property"
            value={formData.property}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Property For</FormLabel>
          <Select
            name="propertyFor"
            value={formData.propertyFor}
            isDisabled={!isEditMode}
            onChange={handleInputChange}
          >
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
            <option value="PG/Co-Living">PG/Co-Living</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Property Type</FormLabel>
          <Select
            name="propertyType"
            value={formData.propertyType}
            isDisabled={!isEditMode}
            onChange={handleInputChange}
          >
            <option value="Commercial">Commercial</option>
            <option value="Residential">Residential</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Property Subtype</FormLabel>
          <Select
            name="propertySubtype"
            value={formData.propertySubtype}
            isDisabled={!isEditMode}
            onChange={handleInputChange}
          >
            <option value="Mall">Mall</option>
            <option value="High Street Market">High Street Market</option>
            <option value="Shop">Shop</option>
            <option value="Farm House">Farm House</option>
            <option value="Flat">Flat</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>RERA Approved</FormLabel>
          <Select
            name="reraApproved"
            value={formData.reraApproved}
            isDisabled={!isEditMode}
            onChange={handleInputChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={formData.status}
            isDisabled={!isEditMode}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Size</FormLabel>
          <Input
            name="size"
            value={formData.size}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input
            name="location"
            value={formData.location}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Sub-Location</FormLabel>
          <Input
            name="subLocation"
            value={formData.subLocation}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            name="address"
            value={formData.address}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Current Cost</FormLabel>
          <Input
            name="currentCost"
            value={formData.currentCost}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Offered Cost</FormLabel>
          <Input
            name="offeredCost"
            value={formData.offeredCost}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Return RY</FormLabel>
          <Input
            name="returnRY"
            value={formData.returnRY}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>RERA Number</FormLabel>
          <Input
            name="reraNo"
            value={formData.reraNo}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Created By</FormLabel>
          <Input
            name="createdBy"
            value={formData.createdBy}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Loan Applicable</FormLabel>
          <Input
            name="loanApplicable"
            value={formData.loanApplicable}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Payment Options</FormLabel>
          <Input
            name="paymentOptions"
            value={formData.paymentOptions}
            isReadOnly={!isEditMode}
            onChange={handleInputChange}
          />
        </FormControl>
      </Grid>

      {/* Edit and Save/Cancel Buttons */}
      <Box mt={6}>
        {!isEditMode ? (
          <Button colorScheme="teal" onClick={() => setIsEditMode(true)}>
            Edit Property
          </Button>
        ) : (
          <>
            <Button colorScheme="teal" onClick={handleSave} mr={4}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
