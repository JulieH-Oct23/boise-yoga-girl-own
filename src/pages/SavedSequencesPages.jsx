import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const SavedSequencesPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Saved Sequences
      </Heading>
      <Text fontSize="lg" color={textColor}>
        This page will show all your saved yoga sequences.
      </Text>
    </Box>
  );
};

export default SavedSequencesPage;