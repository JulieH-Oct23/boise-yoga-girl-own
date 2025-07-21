
// export default SequenceCard;
import React from "react";
import { Box, Image, Text, useColorModeValue } from "@chakra-ui/react";

const SequenceCard = ({ name, difficulty, imageSrc, onClick }) => {
  const bgColor = useColorModeValue("#FAEDEC", "#353325");
  const textColor = useColorModeValue("#353325", "#FAEDEC");

  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg={bgColor}
      color={textColor}
      width="200px"
      minHeight="240px"
      boxShadow="md"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      {imageSrc && (
        <Box height="120px" width="100%" display="flex" alignItems="center" justifyContent="center" bg="#fff">
          <Image
            src={imageSrc}
            alt={name}
            maxHeight="100%"
            maxWidth="100%"
            objectFit="contain"
          />
        </Box>
      )}
      <Box p={3}>
        <Text fontSize="md" fontWeight="bold" mb={1}>
          {name}
        </Text>
        <Text fontSize="sm">Difficulty: {difficulty}</Text>
      </Box>
    </Box>
  );
};

export default SequenceCard;