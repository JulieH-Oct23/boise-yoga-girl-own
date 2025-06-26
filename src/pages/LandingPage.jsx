// src/pages/LandingPage.jsx
import { Box, Heading, Text } from "@chakra-ui/react";

const LandingPage = () => {
  return (
    <Box color="white">
      <Heading mb={4} color="teal.200">Welcome to Boise Yoga Girl</Heading>
      <Text fontSize="lg" color="gray.300">
        Use the sidebar to explore yoga poses and create custom sequences.
      </Text>
    </Box>
  );
};

export default LandingPage;