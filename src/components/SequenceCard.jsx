import { Box, Text, Image, useColorModeValue } from "@chakra-ui/react";

const SequenceCard = ({ name, difficulty, imageSrc, onClick }) => {
  const bg = useColorModeValue("#FAEDEC", "#353325");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");

  return (
    <Box
      bg={bg}
      p={4}
      borderRadius="xl"
      boxShadow="md"
      cursor="pointer"
      onClick={onClick}
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={name}
          borderRadius="lg"
          mb={3}
          objectFit="cover"
          w="100%"
          h="120px"
        />
      )}
      <Text fontSize="xl" fontWeight="bold" color={textColor}>
        {name}
      </Text>
      <Text fontSize="sm" color={textColor}>
        Difficulty: {difficulty}
      </Text>
    </Box>
  );
};

export default SequenceCard;