import { Box, Heading, Text } from "@chakra-ui/react";

const PoseCard = ({ name, category, description, image }) => {
  return (
    <Box
      border="1px solid #444"
      borderRadius="lg"
      p={4}
      bg="gray.800"
      color="white"
      boxShadow="md"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      <img
        src={image || `https://placehold.co/300x200?text=${encodeURIComponent(name)}`}
        alt={name}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "8px" }}
      />
      <Heading size="md" mb={2} color="teal.300">
        {name}
      </Heading>
      <Text fontSize="sm" mb={1} color="gray.400">
        Category: {category}
      </Text>
      <Text fontSize="sm" color="gray.200">
        {description}
      </Text>
    </Box>
  );
};

export default PoseCard;