import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";

const SequenceBuilderPage = () => {
  return (
    <Box color="white" p={6}>
      <Heading mb={4} color="teal.200">Sequence Builder</Heading>
      <Text fontSize="lg" color="gray.300" mb={6}>
        Use this page to create your personalized yoga sequences. Select poses, arrange their order, and save your flow for future practice.
      </Text>

      <VStack spacing={4} align="start">
        {/* Placeholder buttons for pose selection */}
        <Button colorScheme="teal" variant="outline" isDisabled>
          Select Poses (Coming Soon)
        </Button>
        <Button colorScheme="teal" variant="outline" isDisabled>
          Arrange Sequence (Coming Soon)
        </Button>
        <Button colorScheme="teal" isDisabled>
          Save Sequence (Coming Soon)
        </Button>
      </VStack>
    </Box>
  );
};

export default SequenceBuilderPage;