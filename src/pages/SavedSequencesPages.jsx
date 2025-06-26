import { Box, Heading, Text } from "@chakra-ui/react";

const SavedSequencesPage = () => {
  return (
    <Box color="white">
      <Heading mb={4} color="teal.200">Saved Sequences</Heading>
      <Text fontSize="lg" color="gray.300">
        This page will show all your saved yoga sequences.
      </Text>
    </Box>
  );
};

export default SavedSequencesPage;