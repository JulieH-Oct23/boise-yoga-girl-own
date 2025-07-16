import { Box, Heading, Text } from "@chakra-ui/react";

const SequenceCard = ({ name, focus, difficulty, onClick }) => {
  return (
    <Box
      bg="#FAEDEC"
      p={6}
      borderRadius="xl"
      boxShadow="md"
      cursor="pointer"
      onClick={onClick}
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
    >
      <Heading size="md" mb={2}>{name}</Heading>
      <Text><strong>Focus:</strong> {focus}</Text>
      <Text><strong>Difficulty:</strong> {difficulty}</Text>
    </Box>
  );
};

export default SequenceCard;