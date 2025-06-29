import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const PoseCard = ({ _id, name, category, description, image }) => {
  const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const borderColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const categoryColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
  const nameColor = useColorModeValue("brand.light.poseCardTitle", "brand.dark.poseCardTitle");

  return (
    <Link to={`/pose/${_id}`} style={{ textDecoration: "none" }}>
      <Box
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        p={4}
        bg={bg}
        color={textColor}
        boxShadow="md"
        _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
        transition="all 0.2s"
        cursor="pointer"
        display="flex"
        flexDirection="column"
        height="100%" // Make all cards same height in grid
      >
        {/* Image Wrapper for consistent sizing */}
<Box
  width="100%"
  height="200px"
  overflow="hidden"
  borderRadius="md"
  mb={4}
  display="flex"
  alignItems="center"
  justifyContent="center"
>
  <img
    src={image || `https://placehold.co/300x200?text=${encodeURIComponent(name)}`}
    alt={name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain", // 🔄 changed from "cover" to "contain"
      display: "block",
    }}
  />
</Box>

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
    </Link>
  );
};

export default PoseCard;