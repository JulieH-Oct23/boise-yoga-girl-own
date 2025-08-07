
import React from "react";
import { Box, Image, Text, Badge, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PoseCard = ({ name, image, level, style, anatomy }) => {
  const navigate = useNavigate();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="#FAEDEC"
      maxW="250px"
      cursor="pointer"
      onClick={() => navigate(`/pose/${name}`)}
    >
      <Image src={image} alt={name} objectFit="cover" w="100%" h="150px" />
      <Stack mt={2} spacing={1}>
        <Text fontWeight="bold">{name}</Text>
        <Badge colorScheme="pink">{level}</Badge>
        <Badge colorScheme="purple">{style}</Badge>
        {Array.isArray(anatomy) && anatomy.length > 0 && (
          <Box>
            <Text fontSize="sm" mt={1} fontWeight="semibold">
              Anatomy:
            </Text>
            {anatomy.map((part, idx) => (
              <Badge key={idx} colorScheme="teal" mr={1}>
                {part}
              </Badge>
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default PoseCard;