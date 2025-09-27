import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

const PoseCard = ({ pose, onClick }) => {
  return (
    <Box
      onClick={onClick}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      cursor="pointer"
      bg="pink.50"
    >
      <VStack spacing={2} align="start">
        <Image src={pose.imageUrl} alt={pose.englishName} boxSize="200px" objectFit="cover" />
        <Text fontWeight="bold">{pose.englishName}</Text>
        <Text fontStyle="italic">{pose.sanskritName}</Text>
        {pose.anatomy && pose.anatomy.length > 0 && (
          <Text fontSize="sm">Anatomy: {pose.anatomy.join(", ")}</Text>
        )}
      </VStack>
    </Box>
  );
};

export default PoseCard;