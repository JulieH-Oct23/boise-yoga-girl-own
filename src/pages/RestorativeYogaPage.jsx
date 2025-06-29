import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const RestorativeYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Restorative Yoga
      </Heading>
      <Text fontSize="lg" color={textColor}>
        This page will feature relaxing, supported poses to promote deep rest and healing.
      </Text>
    </Box>
  );
};

export default RestorativeYogaPage;