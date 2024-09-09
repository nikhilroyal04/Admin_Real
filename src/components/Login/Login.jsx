import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const pageTransition = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
  transition: { duration: 0.6 },
};

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission delay
    setTimeout(() => {
      toast({
        title: "Login successful.",
        description: "You have been logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition.transition}
      variants={pageTransition}
      style={{ width: "100%" }}
    >
      <Container
        maxW="100vw"
        h="100vh"
        p={0}
        margin={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Login Box Section */}
        <Box
          maxW="md"
          borderWidth={1}
          borderRadius="3xl"
          bg="white"
          width={{ base: "90%", lg: "550px" }}
          boxShadow="xl"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="md"
          p={6}
        >
          <Heading mb={6} textAlign="center" fontSize="3xl" color="teal.600">
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  bg="gray.50"
                  borderRadius="lg"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  width={{ base: "100%", lg: 350 }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  bg="gray.50"
                  borderRadius="lg"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  width={{ base: "100%", lg: 350 }}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                size="md"
                width="full"
                borderRadius="md"
                boxShadow="md"
                sx={{ width: 250, mx: "auto" }}
                isDisabled={isSubmitting}
                _hover={{
                  backgroundColor: "teal.400",
                  transform: "scale(1.05)",
                  transition: "0.3s",
                }}
              >
                {isSubmitting ? <Spinner size="sm" /> : "Login"}
              </Button>
            </Stack>
          </form>
          <Text mt={4} textAlign="center">
            <Button
              variant="link"
              colorScheme="teal"
              _hover={{
                textDecoration: "underline",
                color: "teal.700",
              }}
            >
              Forgot Password?
            </Button>
          </Text>
        </Box>
      </Container>
    </motion.div>
  );
};

export default LoginPage;
