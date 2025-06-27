import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const PoseCard = ({ name, category, description, image }) => {
  const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const borderColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const categoryColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
  const nameColor = useColorModeValue("brand.light.poseCardTitle", "brand.dark.poseCardTitle");

  return (
    <Box
      border={`1px solid`}
      borderColor={borderColor}
      borderRadius="lg"
      p={4}
      bg={bg}
      color={textColor}
      boxShadow="md"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      <img
        src={image || `https://placehold.co/300x200?text=${encodeURIComponent(name)}`}
        alt={name}
        style={{ width: "100%", borderRadius: "8px", marginBottom: "8px" }}
      />
      <Heading size="md" mb={2} color={nameColor}>
        {name}
      </Heading>
      <Text fontSize="sm" mb={1} color={categoryColor}>
        Category: {category}
      </Text>
      <Text fontSize="sm" color={textColor}>
        {description}
      </Text>
    </Box>
  );
};

export default PoseCard;