import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const PowerYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Power Yoga
      </Heading>
      <Text fontSize="lg" color={textColor}>
        This page will feature dynamic, strength-building yoga poses and flows to energize your practice.
      </Text>
    </Box>
  );
};

export default PowerYogaPage;