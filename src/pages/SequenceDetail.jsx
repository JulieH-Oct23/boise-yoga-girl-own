import React from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

const SequenceDetail = () => {
  const { id } = useParams();

  return (
    <Box p={6}>
      <Heading mb={4}>Sequence Detail</Heading>
      <Text>Sequence ID: {id}</Text>
      {/* TODO: Fetch and display full sequence details here */}
    </Box>
  );
};

export default SequenceDetail;